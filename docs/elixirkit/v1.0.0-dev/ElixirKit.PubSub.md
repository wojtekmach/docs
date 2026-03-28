# `ElixirKit.PubSub`

Publish/Subscribe server to exchange messages between Elixir and native code.

Corresponding PubSub implementations for native apps:

* [`elixirkit::PubSub` (Rust)]
* [`ElixirKit.PubSub` (Swift)]

PubSub is designed to be started alongside one from a native app. Otherwise, broadcasts are
dropped with a warning so development can proceed without running native code.

Subscribes and broadcasts are always unidirectional, that is, an Elixir process will not receive
their own broadcasts.

See `start_link/1` for an example.

[`elixirkit::PubSub` (Rust)]: rs/elixirkit/struct.PubSub.html
[`ElixirKit.PubSub` (Swift)]: swift/documentation/elixirkit/pubsub

# `message`

```elixir
@type message() :: binary()
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

Returns a specification to start PubSub under a supervisor.

## Options

  * `:significant` - a boolean indicating if the child process should be
    considered significant with regard to automatic shutdown. Defaults to `false`.

Remaining options are the same as `start_link/1`.

# `start_link`

Starts PubSub and links it to the current process.

## Options

  * `:on_exit` - a zero-arity function called when PubSub exits (e.g. when the native side
    disconnects).

    > #### Handling exit {: .warning}
    >
    > It is recommended to set `on_exit: fn -> System.stop() end` to cleanly shutdown the VM
    > when the native side exits abruptly.
    >
    > Alternatively, consider monitoring the `ElixirKit.PubSub` process and respond accordingly.
    >
    > Finally, you may instead set `{ElixirKit.PubSub, significant: true}` in your supervision
    > tree and set your supervisor to `auto_shutdown: :any_significant` (or `:all_significant`).

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
      {ElixirKit.PubSub, on_exit: fn -> System.stop() end},
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
