# `Req.Encode`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/encode.ex#L1)

Encodes the request body.

Supports `:json`, `:form`, and `:form_multipart` options.

If the method is `"GET"` but a body is set, the method is automatically
switched to `"POST"`.

## Options

* `:json` - If set, encodes the request body as JSON (via `Jason.encode_to_iodata!/1`) and sets `content-type` to `application/json`. `term()`.

* `:form` - If set, encodes the request body as `application/x-www-form-urlencoded` (via `URI.encode_query/1`). `term()`.

* `:form_multipart` - If set, encodes the request body as `multipart/form-data`. `term()`.

## Examples

    iex> conn = Req.fetch!(url: "https://httpbin.org/anything", json: %{x: 1})
    iex> conn.resp_body["json"]
    %{"x" => 1}

---

*Consult [api-reference.md](api-reference.md) for complete listing*
