# `Req.MintAdapter`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/mint_adapter.ex#L1)

Req adapter that uses [Mint](https://hex.pm/packages/mint).

## Examples

    iex> conn = Req.fetch!("https://httpbin.org/headers", adapter: :mint)
    iex> conn.resp_body["headers"]["User-Agent"]
    "req/0.6.0-dev mint/1.7.1"

---

*Consult [api-reference.md](api-reference.md) for complete listing*
