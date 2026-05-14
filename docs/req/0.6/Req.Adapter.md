# `Req.Adapter`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/adapter.ex#L1)

Behaviour for Req adapters — the modules that perform the actual HTTP request.

An adapter receives the connection and the runtime options keyword and returns
either the connection with `:status`, `:resp_headers`, `:resp_body` populated,
or `{:error, conn, exception}` on failure.

Built-in adapters: `Req.FinchAdapter`, `Req.PlugAdapter`.

# `call`
*since 0.6.0* 

```elixir
@callback call(
  Req.Conn.t(),
  keyword()
) :: Req.Conn.t() | {:error, Req.Conn.t(), Exception.t()}
```

---

*Consult [api-reference.md](api-reference.md) for complete listing*
