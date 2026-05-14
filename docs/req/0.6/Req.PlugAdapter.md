# `Req.PlugAdapter`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/plug_adapter.ex#L1)

Req adapter that uses a server [`Plug`](`Plug`).

Set as `conn.adapter` automatically by `Req.fetch/2` when the `:plug`
option is given.

## Options

  * `:plug` — a server plug `(Plug.Conn.t() -> Plug.Conn.t())`.

---

*Consult [api-reference.md](api-reference.md) for complete listing*
