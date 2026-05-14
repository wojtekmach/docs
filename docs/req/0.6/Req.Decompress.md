# `Req.Decompress`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/decompress.ex#L1)

Decompresses the response body when the `content-encoding` header is `gzip`.

## Options

* `:raw` - When `true`, the response body is left as-is. `boolean()`. Defaults to `false`.

## Examples

    iex> conn = Req.fetch!("https://httpbin.org/gzip")
    iex> conn.resp_body["gzipped"]
    true

---

*Consult [api-reference.md](api-reference.md) for complete listing*
