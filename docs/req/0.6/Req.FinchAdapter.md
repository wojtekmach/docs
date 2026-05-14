# `Req.FinchAdapter`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/finch_adapter.ex#L1)

Req adapter that uses [Finch](https://hex.pm/packages/finch).

This is the default adapter.

## Examples

    iex> conn = Req.fetch!("https://httpbin.org/headers", adapter: :finch)
    iex> conn.resp_body["headers"]["User-Agent"]
    "req/0.6.0-dev finch/0.21.0"

---

*Consult [api-reference.md](api-reference.md) for complete listing*
