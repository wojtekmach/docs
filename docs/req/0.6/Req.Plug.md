# `Req.Plug`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/plug.ex#L1)

Behaviour for Req pipeline plug modules.

A plug declares its options via a `Req.Options` schema and consumes the
validated options bag in `call/2`. `Req.Builder` merges the per-plug schemas
into a single schema that validates and applies defaults before reaching
the pipeline.

## Example

    defmodule MyApp.TagRequest do
      import Req.Options
      @behaviour Req.Plug

      defoptions do
        @doc "Header tag to attach."
        tag = "untagged" :: binary()
      end

      @impl true
      def options do
        @options
      end

      @impl true
      def call(conn, options) do
        Req.Conn.put_req_header(conn, "x-tag", options[:tag])
      end
    end

# `call`
*since 0.6.0* 

```elixir
@callback call(
  Req.Conn.t(),
  keyword()
) :: Req.Conn.t() | {:error, Req.Conn.t(), Exception.t()}
```

# `options`
*since 0.6.0* *optional* 

```elixir
@callback options() :: %Req.Options{options: term()}
```

---

*Consult [api-reference.md](api-reference.md) for complete listing*
