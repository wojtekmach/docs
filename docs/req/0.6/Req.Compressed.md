# `Req.Compressed`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/compressed.ex#L1)

Asks the server to gzip the response by setting `accept-encoding: gzip`.

Pairs with `Req.Decompress`, which transparently inflates the response body.

## Options

* `:compressed` - When `true`, sets `accept-encoding: gzip` on the request. `boolean()`. Defaults to `true`.

## Examples

    iex> conn = Req.fetch!("https://httpbin.org/headers")
    iex> conn.resp_body["headers"]["Accept-Encoding"]
    "gzip"

    iex> conn = Req.fetch!("https://httpbin.org/headers", compressed: false)
    iex> conn.resp_body["headers"]["Accept-Encoding"]
    nil

---

*Consult [api-reference.md](api-reference.md) for complete listing*
