# `Req.Retry`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/retry.ex#L1)

Retries the request on one of:

  * HTTP 5xx response status
  * `Req.TransportError` (connection refused, timeout, ...)

Transport errors mid-stream, after receiving response status, are not retried.

## Options

* `:retry` - Retry configuration. Set to `false` to disable. One of:

  * a keyword list:

      * `:max` - Maximum number of retries. `pos_integer()`.
  * `false`

## Examples

    conn = Req.fetch!("https://httpbin.org/status/500,200")
    # Log:
    # Log: 17:00:45.571 [info] GET https://httpbin.org/status/500,200 HTTP 500 (133ms)
    # Log:
    # Log: 17:00:45.572 [info] retrying...
    # Log:
    # Log: 17:00:45.706 [info] GET https://httpbin.org/status/500,200 HTTP 200 (134ms)
    conn.status
    #=> 200

---

*Consult [api-reference.md](api-reference.md) for complete listing*
