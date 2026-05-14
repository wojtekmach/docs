# `Req.Plug.Wrapper`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/plug/wrapper.ex#L1)

Behaviour for plugs that wrap the rest of the pipeline.

A wrapper receives the connection, the validated options bag, and a
continuation function representing the rest of the pipeline. Wrappers
may invoke the continuation zero, one, or many times.

## Example

    defmodule MyTime do
      @behaviour Req.Plug.Wrapper

      @impl true
      def wrap(conn, _options, next) do
        start = System.monotonic_time()
        conn = next.(conn)
        elapsed = System.monotonic_time() - start
        IO.inspect(elapsed, label: "elapsed")
        conn
      end
    end

# `options`
*since 0.6.0* *optional* 

```elixir
@callback options() :: %Req.Options{options: term()}
```

# `wrap`
*since 0.6.0* 

```elixir
@callback wrap(
  Req.Conn.t(),
  keyword(),
  (Req.Conn.t() -&gt; Req.Conn.t() | {:error, Req.Conn.t(), Exception.t()})
) :: Req.Conn.t() | {:error, Req.Conn.t(), Exception.t()}
```

---

*Consult [api-reference.md](api-reference.md) for complete listing*
