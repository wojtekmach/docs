# `Req.Redirect`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/redirect.ex#L1)

Follows HTTP redirects.

## Options

* `:redirect` - Redirect configuration. Set to `false` to disable. One of:

  * a keyword list:

      * `:max` - Maximum number of redirects. `pos_integer()`. Defaults to `10`.
      * `:trusted` - When `true`, sensitive headers (authorization, cookie) are kept across cross-origin redirects. `boolean()`. Defaults to `false`.
  * `false`

  Defaults to `[max: 10, trusted: false]`.

## Examples

    iex> conn = Req.fetch!("https://httpbin.org/redirect/2")
    iex> conn.status
    200

---

*Consult [api-reference.md](api-reference.md) for complete listing*
