# `Req.ExpectStatus`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/expect_status.ex#L1)

Asserts the response status matches the expected status code or range.

Returns `{:error, conn, %Req.UnexpectedStatusError{}}` when the status does not match.

## Options

* `:expect_status` - An integer or a range. When unset, the plug is a no-op.

  * `pos_integer()`
  * `%Range{}`

## Examples

    iex> Req.fetch!("https://httpbin.org/status/201", expect_status: 201).status
    201

    iex> Req.fetch!("https://httpbin.org/status/404", expect_status: 200..299)
    ** (Req.UnexpectedStatusError) expected status 200..299, got: 404

Using `Req.fetch/2` (non-raising):

    iex> {:error, _conn, exception} = Req.fetch(url: "https://httpbin.org/status/201", expect_status: 202)
    iex> exception
    %Req.UnexpectedStatusError{expected: 202, actual: 201}

---

*Consult [api-reference.md](api-reference.md) for complete listing*
