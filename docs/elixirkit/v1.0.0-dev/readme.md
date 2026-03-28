# ElixirKit

A toolkit for running Elixir in native apps and using native code from Elixir.

## Features

* Run Elixir from native apps and exchange messages over [PubSub].

* Use foreign languages as NIFs -- native functions that run in the same memory
  space as the VM with low overhead and best performance.

* Use foreign languages as ports -- external programs that run in a separate OS
  process. Crashes are isolated and won't affect the VM. Port programs can
  define an RPC-like API and/or use PubSub.

* Use `mix elixirkit.precompile` to cross-compile NIFs and ports for multiple
  targets so end users don't need a compiler toolchain installed.

Language support:

* Rust: [`ElixirKit.Rust`], [`elixirkit_rs`]
* Swift: [`ElixirKit.Swift`], [`elixirkit_swift`]

## Examples

* [Rust Elixir Process Example](#rust-elixir-process-example)
* [Rust NIF Example](#rust-nif-example)
* [Rust Port Example with RPC](#rust-port-example-with-rpc)
* [Rust Port Example with PubSub](#rust-port-example-with-pubsub)
* [Swift Elixir Process Example](#swift-elixir-process-example)
* [Swift NIF Example](#swift-nif-example)
* [Swift Port Example](#swift-port-example)

### Rust Elixir Process Example

On the Rust side, use [`elixirkit::elixir`] to start Elixir and
[`elixirkit::PubSub`] to exchange messages. Subscribe before starting Elixir so
no messages are missed:

```rust
// main.rs
let pubsub = elixirkit::PubSub::bind(0)
    .expect("failed to bind to port");

pubsub.subscribe("topic", move |msg| {
    if msg == b"ping" {
        pubsub.broadcast("topic", b"pong");
    }
});

let child = elixirkit::elixir(&["script.exs"], pubsub)
    .expect("failed to start Elixir");

let status = child.wait().expect("failed to wait");

if let Some(code) = status.code() {
    println!("elixir exited with {}", code);
}
```

On the Elixir side, start [`ElixirKit.PubSub`] under a supervision tree and use
[`ElixirKit.PubSub.subscribe/1`] to listen to messages and
[`ElixirKit.PubSub.broadcast/2`] to send messages to the Rust side:

```elixir
# script.exs
Mix.install([:elixirkit])

children = [
  {ElixirKit.PubSub, on_exit: fn -> System.stop() end}
]

{:ok, _} = Supervisor.start_link(children, strategy: :one_for_one)

ElixirKit.PubSub.subscribe("topic")
ElixirKit.PubSub.broadcast("topic", "ping")

receive do
  message ->
    IO.puts(["[elixir] ", inspect(message)])
end
```

### Rust NIF Example

```elixir
defmodule ExampleNIF do
  use ElixirKit.Rust

  defnif(~RS"""
  #[nif]
  fn add(a: i64, b: i64) -> i64 {
      a + b
  }
  """)
end

iex> ExampleNIF.add(1, 2)
3
```

### Rust Port Example with RPC

```elixir
defmodule ExamplePort do
  use ElixirKit.Rust

  defport(~RS"""
  #[port::rpc]
  fn add(a: i64, b: i64) -> i64 {
      a + b
  }

  fn main() {
      port::run_rpc!();
  }
  """)
end

iex> port = ExamplePort.open()
iex> ExamplePort.add(port, 1, 2)
3
```

### Rust Port Example with PubSub

```elixir
defmodule ExamplePort do
  use ElixirKit.Rust

  defport(~RS"""
  fn main() {
      let pubsub = elixirkit::PubSub::bind(0).unwrap();

      pubsub.subscribe("topic", move |msg| {
          println!("received: {:?}", msg);
      });

      pubsub.broadcast("topic", b"hello from port");
      pubsub.wait()?;
  }
  """)
end

children = [
  ElixirKit.PubSub
]

{:ok, _} = Supervisor.start_link(children, strategy: :one_for_one)

ElixirKit.PubSub.subscribe("topic")
port = ExamplePort.open()
ElixirKit.PubSub.broadcast("topic", "ping")

receive do
  message ->
    IO.puts(["[elixir] ", inspect(message)])
end
```

### Swift Elixir Process Example

On the Swift side, use [`ElixirKit.elixir`] to start Elixir and
[`ElixirKit.PubSub` (Swift)] to exchange messages. Subscribe before starting Elixir so
no messages are missed:

```swift
// main.swift
import ElixirKit

let pubsub = try PubSub.bind(0)

pubsub.subscribe("topic") { msg in
    if msg == Data("ping".utf8) {
        pubsub.broadcast("topic", Data("pong".utf8))
    }
}

let child = try ElixirKit.elixir(["script.exs"], pubsub: pubsub)
let status = child.wait()
print("elixir exited with \(status)")
```

The Elixir side is the same as in the [Rust example](#rust-elixir-process-example) above.

### Swift NIF Example

```elixir
defmodule ExampleNIF do
  use ElixirKit.Swift

  defnif(~SW"""
  @nif
  func add(a: Int64, b: Int64) -> Int64 {
      return a + b
  }
  """)
end

iex> ExampleNIF.add(1, 2)
3
```

### Swift Port Example

```elixir
defmodule ExamplePort do
  use ElixirKit.Swift

  defport(~SW"""
  @rpc
  func add(a: Int64, b: Int64) -> Int64 {
      return a + b
  }

  Port.runRPC()
  """)
end

iex> port = ExamplePort.open()
iex> ExamplePort.add(port, 1, 2)
3
```

## License

Copyright (C) 2026 Dashbit

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[PubSub]:                         ElixirKit.PubSub.html
[`ElixirKit.PubSub`]:             ElixirKit.PubSub.html
[`ElixirKit.PubSub.subscribe/1`]: ElixirKit.PubSub.html#subscribe/1
[`ElixirKit.PubSub.broadcast/2`]: ElixirKit.PubSub.html#broadcast/2

[`ElixirKit.Rust`]:               ElixirKit.Rust.html
[`elixirkit_rs`]:                 rs/elixirkit/index.html
[`elixirkit::elixir`]:            rs/elixirkit/fn.elixir.html
[`elixirkit::PubSub`]:            rs/elixirkit/struct.PubSub.html

[`ElixirKit.Swift`]:              ElixirKit.Swift.html
[`elixirkit_swift`]:              swift/documentation/elixirkit
[`ElixirKit.elixir`]:             swift/documentation/elixirkit/elixir(_:_:)
[`ElixirKit.PubSub` (Swift)]:     swift/documentation/elixirkit/pubsub
