# ElixirKit

ElixirKit helps running Elixir alongside native applications written in Rust.

Features:

* [`elixirkit::elixir`], [`elixirkit::mix`], and [`elixirkit::release`] for starting Elixir.
* [`elixirkit::PubSub`] and [`ElixirKit.PubSub`] for communication.

## Usage

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

let status = elixirkit::elixir(&["script.exs"], pubsub)
    .status()
    .expect("failed to start Elixir");

if let Some(code) = status.code() {
    println!("elixir exited with {}", code);
}
```

On Elixir side, start [`ElixirKit.PubSub`] under supervision tree and use
[`ElixirKit.PubSub.subscribe/1`] to listen to messages and
[`ElixirKit.PubSub.broadcast/2`] to send messages to Rust side:

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

See more examples:

- [`examples/cli_script.rs`] - CLI single-file example.
- [`examples/tauri_script.rs`] - Tauri desktop app single-file example.
- [`examples/tauri_project`] - Tauri desktop app example.

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

[`elixirkit::elixir`]:  rs/elixirkit/fn.elixir.html
[`elixirkit::mix`]:     rs/elixirkit/fn.mix.html
[`elixirkit::release`]: rs/elixirkit/fn.release.html
[`elixirkit::PubSub`]:  rs/elixirkit/struct.PubSub.html
[`ElixirKit.PubSub`]:             ElixirKit.PubSub.html
[`ElixirKit.PubSub.subscribe/1`]: ElixirKit.PubSub.html#subscribe/1
[`ElixirKit.PubSub.broadcast/2`]: ElixirKit.PubSub.html#broadcast/2
[`examples/cli_script.rs`]:   https://github.com/livebook-dev/livebook/blob/main/elixirkit_next/cli_script.rs
[`examples/tauri_script.rs`]: https://github.com/livebook-dev/livebook/blob/main/elixirkit_next/tauri_script.rs
[`examples/tauri_project`]:   https://github.com/livebook-dev/livebook/blob/main/elixirkit_next/tauri_project
