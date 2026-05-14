# `Req.Decode`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/decode.ex#L1)

Decodes the response body based on the `content-type` response header.

Currently supports `application/json`.

## Options

* `:raw` - When `true`, the response body is left as-is. `boolean()`. Defaults to `false`.

## Examples

    iex> conn = Req.fetch!("https://httpbin.org/json")
    iex> conn.resp_body["slideshow"]["title"]
    "Sample Slide Show"

---

*Consult [api-reference.md](api-reference.md) for complete listing*
