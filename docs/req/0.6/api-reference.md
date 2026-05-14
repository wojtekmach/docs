# req v0.6.0-dev - API Reference

## Modules

- [Req](Req.md): TODO

- [Req.Builder](Req.Builder.md): Conveniences for building Req plug pipelines at compile time.
- [Req.Conn](Req.Conn.md): The Req connection struct.
- [Req.Conn.Headers](Req.Conn.Headers.md): Opaque container for Req request/response headers.
- [Req.Options](Req.Options.md): Functions for validating and documenting options.
- [Req.Plug](Req.Plug.md): Behaviour for Req pipeline plug modules.
- [Req.Plug.Wrapper](Req.Plug.Wrapper.md): Behaviour for plugs that wrap the rest of the pipeline.
- [Req.Test](Req.Test.md): Req testing conveniences.

- Plugs
  - [Req.Auth](Req.Auth.md): Uses Basic, Digest, or Bearer authentication.
  - [Req.Compressed](Req.Compressed.md): Asks the server to gzip the response by setting `accept-encoding: gzip`.
  - [Req.Decode](Req.Decode.md): Decodes the response body based on the `content-type` response header.
  - [Req.Decompress](Req.Decompress.md): Decompresses the response body when the `content-encoding` header is `gzip`.
  - [Req.Encode](Req.Encode.md): Encodes the request body.
  - [Req.ExpectStatus](Req.ExpectStatus.md): Asserts the response status matches the expected status code or range.
  - [Req.Logger](Req.Logger.md): Logs the request method, URL, response, and elapsed time.

  - [Req.Redirect](Req.Redirect.md): Follows HTTP redirects.
  - [Req.Retry](Req.Retry.md): Retries the request on one of

- Adapters
  - [Req.Adapter](Req.Adapter.md): Behaviour for Req adapters — the modules that perform the actual HTTP request.
  - [Req.FinchAdapter](Req.FinchAdapter.md): Req adapter that uses [Finch](https://hex.pm/packages/finch).
  - [Req.HTTPCAdapter](Req.HTTPCAdapter.md): Req adapter that uses Erlang's [`:httpc`](`:httpc`).
  - [Req.MintAdapter](Req.MintAdapter.md): Req adapter that uses [Mint](https://hex.pm/packages/mint).
  - [Req.PlugAdapter](Req.PlugAdapter.md): Req adapter that uses a server [`Plug`](`Plug`).

- Exceptions
  - [Req.ArchiveError](Req.ArchiveError.md): Represents an error when unpacking archives fails, returned by `Req.Steps.decode_body/1`.

  - [Req.ChecksumMismatchError](Req.ChecksumMismatchError.md): Represents a checksum mismatch error returned by `Req.Steps.checksum/1`.

  - [Req.DecompressError](Req.DecompressError.md): Represents an error when decompression fails, returned by `Req.Steps.decompress_body/1`.

  - [Req.HTTPError](Req.HTTPError.md): Represents an HTTP protocol error.
  - [Req.Test.OwnershipError](Req.Test.OwnershipError.md)
  - [Req.TooManyRedirectsError](Req.TooManyRedirectsError.md): Represents an error when too many redirects occurred, returned by `Req.Steps.redirect/1`.

  - [Req.TransportError](Req.TransportError.md): Represents an error with the transport used by an HTTP connection.
  - [Req.UnexpectedStatusError](Req.UnexpectedStatusError.md): An exception returned when the response has an unexpected status.

- Deprecated
  - [Req.Request](Req.Request.md): The low-level API and the request struct.
  - [Req.Response](Req.Response.md): The response struct.
  - [Req.Response.Async](Req.Response.Async.md): Asynchronous response body.
  - [Req.Steps](Req.Steps.md): The collection of built-in steps.

