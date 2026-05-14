# `Req.HTTPCAdapter`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/httpc_adapter.ex#L1)

Req adapter that uses Erlang's [`:httpc`](`:httpc`).

## Examples

    iex> conn = Req.fetch!("https://httpbin.org/headers", adapter: :httpc)
    iex> conn.resp_body["headers"]["User-Agent"]
    "req/0.6.0-dev httpc/9.7"

---

*Consult [api-reference.md](api-reference.md) for complete listing*
