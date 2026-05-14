# `Req.UnexpectedStatusError`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/unexpected_status_error.ex#L1)

An exception returned when the response has an unexpected status.

The public fields are:

  * `:expected` - the expected HTTP response status (integer or range).
  * `:actual` - the actual HTTP response status.

Legacy fields (used by the deprecated `Req.Steps.expect/1` flow):

  * `:expected_status` - the expected HTTP response status.
  * `:response` - the HTTP response.

---

*Consult [api-reference.md](api-reference.md) for complete listing*
