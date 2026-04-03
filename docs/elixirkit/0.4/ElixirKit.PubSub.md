# `ElixirKit.PubSub`

Publish/Subscribe server to exchange messages between Elixir and native code.

PubSub is designed to be started alongside [`elixirkit::PubSub`] from a native app.

Subscribes and broadcasts are always unidirectional, that is, an Elixir process will not receive
their own broadcasts.

Elixir and native types are automatically encoded/decoded, see [`elixirkit::term`].

See `start_link/1` for an example.

[`elixirkit::PubSub`]:   rs/elixirkit/struct.PubSub.html
[`elixirkit::term`]:     rs/elixirkit/term/index.html

# `message`

```elixir
@type message() :: term()
```

# `topic`

```elixir
@type topic() :: String.t()
```

# `broadcast`

```elixir
@spec broadcast(topic(), message()) :: :ok
```

Broadcasts a message on the given topic to the Rust side.

# `child_spec`

```elixir
@spec child_spec(keyword()) :: Supervisor.child_spec()
```

Returns a specification to start PubSub under a supervisor.

## Options

  * `:significant` - a boolean indicating if the child process should be
    considered significant with regard to automatic shutdown. Defaults to `false`.

Remaining options are the same as in `start_link/1`.

# `start_link`

```elixir
@spec start_link(keyword()) :: GenServer.on_start()
```

Starts PubSub and links it to the current process.

## Options

  * `:connect` - how to connect to the native side. Can be one of:

    * `:ignore` - don't start the server.

    * a URL - e.g. `"tcp://127.0.0.1:12345"`.

    [`elixirkit::elixir`] and friends set the `ELIXIRKIT_PUBSUB` environment variable,
    so a common pattern is `connect: System.get_env("ELIXIRKIT_PUBSUB") || :ignore`.

    [`elixirkit::elixir`]: rs/elixirkit/fn.elixir.html

  * `:on_exit` - a zero-arity function called when PubSub exits (e.g. when the native side
    disconnects).

    > #### Handling exit {: .warning}
    >
    > It is recommended to set `on_exit: fn -> System.stop() end` to cleanly shutdown the VM
    > when the native side exits abruptly.
    >
    > Alternatively, consider monitoring the `ElixirKit.PubSub` process and respond accordingly.
    >
    > Finally, you may instead set `{ElixirKit.PubSub, ..., significant: true}` in your
    > supervision tree and set your supervisor to
    > `auto_shutdown: :any_significant | :all_significant`.

## Examples

    defmodule Server do
      use GenServer

      @impl true
      def init(_) do
        ElixirKit.PubSub.subscribe("messages")
        ElixirKit.PubSub.broadcast("messages", "ready")
        {:ok, %{}}
      end

      @impl true
      def handle_info(message, state) do
        dbg(message)
        {:noreply, state}
      end
    end

    children = [
      {ElixirKit.PubSub,
       connect: System.fetch_env!("ELIXIRKIT_PUBSUB"),
       on_exit: fn -> System.stop() end},
      Server
    ]

    {:ok, _} = Supervisor.start_link(children, strategy: :one_for_one)

# `subscribe`

```elixir
@spec subscribe(topic()) :: :ok
```

Subscribes the caller to messages on the given topic from the Rust side.

---

*Consult [api-reference.md](api-reference.md) for complete listing*
