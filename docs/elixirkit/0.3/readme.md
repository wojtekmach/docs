# ElixirKit

Integrate Elixir and Rust apps and exchange messages over [PubSub].

## Examples

  * [Rust spawns Elixir process](#rust-spawns-elixir-process)
  * [Elixir spawns Rust port](#elixir-spawns-rust-port)

### Rust spawns Elixir process

On the Rust side, use [`elixirkit::elixir`] to start Elixir and
[`elixirkit::PubSub`] to exchange messages. Subscribe before starting Elixir so
no messages are missed:

```rust
// main.rs
use elixirkit::{elixir, PubSub};
use elixirkit::term::{ToTerm, FromTerm};

#[derive(ToTerm)]
enum SendMessage {
    Echo(String),
}

#[derive(FromTerm)]
enum RecvMessage {
    Ready,
    Echo(String),
}

fn main() {
    let pubsub = PubSub::listen("tcp://127.0.0.1:0")
        .expect("failed to listen");

    let pubsub_for_topic = pubsub.clone();
    pubsub.subscribe("topic", move |msg: RecvMessage| {
        match msg {
            RecvMessage::Ready => {
                pubsub_for_topic
                    .broadcast("topic", &SendMessage::Echo("Hello from Rust".into()))
                    .unwrap();
            }
            RecvMessage::Echo(message) => {
                println!("[rust] {message}");
            }
        }
    });

    let status = elixir(&["script.exs"], &pubsub)
        .status()
        .expect("failed to start Elixir");

    std::process::exit(status.code().unwrap_or(1));
}
```

On the Elixir side, start [`ElixirKit.PubSub`] under a supervision tree and use
[`ElixirKit.PubSub.subscribe/1`] to listen to messages and
[`ElixirKit.PubSub.broadcast/2`] to send messages to the Rust side:

```elixir
# script.exs
Mix.install([:elixirkit])

children = [
  {ElixirKit.PubSub,
   connect: System.get_env("ELIXIRKIT_PUBSUB") || :ignore,
   on_exit: fn -> System.stop() end}
]

{:ok, _} = Supervisor.start_link(children, strategy: :one_for_one)

ElixirKit.PubSub.subscribe("topic")
ElixirKit.PubSub.broadcast("topic", :ready)

receive do
  {:echo, message} ->
    IO.puts("[elixir] #{message}")
    ElixirKit.PubSub.broadcast("topic", {:echo, "hello from Elixir"})
end
```

### Elixir spawns Rust port

ElixirKit can spawn Rust ports using `ElixirKit.Rust.defport/1`. Ports are
external programs that run in a separate OS process; crashes are isolated and
won't affect the VM.

```elixir
defmodule ExamplePort do
  use ElixirKit.Rust

  defport(~RS"""
  use elixirkit::{PubSub, term::{ToTerm, FromTerm}};

  #[derive(ToTerm, FromTerm)]
  enum Message {
      Echo(String),
  }

  fn main() {
      let url = std::env::var("ELIXIRKIT_PUBSUB")
          .expect("ELIXIRKIT_PUBSUB not set");
      let pubsub = PubSub::connect(&url)
          .expect("failed to connect");

      pubsub.subscribe("messages", |msg: Message| {
          println!("[rust] got: {msg:?}");
      });

      pubsub.broadcast("messages", &Message::Echo("ping".into())).unwrap();
      pubsub.wait()?;
  }
  """)
end

{:ok, pubsub} = ElixirKit.PubSub.start_link(listen: "tcp://127.0.0.1:0")
ElixirKit.PubSub.subscribe("messages")

port = ExamplePort.open(pubsub: pubsub)
true = is_port(port)

receive do
  message ->
    IO.puts(["[elixir] got: ", inspect(message)])
end
```

`ElixirKit.Rust` builds the port executable using `cargo build` in a temporary
crate behind the scenes. If you want to add dependencies or make other
adjustments, do:

```elixir
@port_project %{
  "Cargo.toml" => "...",
  "build.rs" => "..."
}

defport(~RS"""
...
""")
```

or instead of using `~RS` sigil, use an existing crate:

```elixir
@port_project "#{__DIR__}/../native"
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

[`elixirkit_rs`]:                 rs/elixirkit/index.html
[`elixirkit::elixir`]:            rs/elixirkit/fn.elixir.html
[`elixirkit::PubSub`]:            rs/elixirkit/struct.PubSub.html
