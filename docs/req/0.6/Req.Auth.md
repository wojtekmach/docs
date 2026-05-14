# `Req.Auth`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/auth.ex#L1)

Uses Basic, Digest, or Bearer authentication.

## Options

* `:auth` - If set, uses Basic, Digest, or Bearer authentication. Use a function or MFArgs to compute
dynamically. One of:

  * `{:basic, binary()}`
  * `{:digest, binary()}`
  * `{:bearer, binary()}`
  * `&function/0`
  * `{atom(), atom(), list()}`
  * `false`

  Defaults to `false`.

## Examples

    iex> conn = Req.conn("https://httpbin.org/basic-auth/foo/bar")
    iex> Req.fetch!(conn, auth: {:basic, "foo:bar"}).status
    200
    iex> Req.fetch!(conn).status
    401

    iex> conn = Req.conn("https://httpbin.org/digest-auth/auth/foo/bar")
    iex> Req.fetch!(conn, auth: {:digest, "foo:bar"}).status
    200
    iex> Req.fetch!(conn).status
    401

    iex> conn = Req.conn("https://httpbin.org/bearer")
    iex> Req.fetch!(conn, auth: {:bearer, "token"}).status
    200
    iex> Req.fetch!(conn).status
    401

---

*Consult [api-reference.md](api-reference.md) for complete listing*
