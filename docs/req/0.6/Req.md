# `Req`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req.ex#L1)

TODO

# `url`

```elixir
@type url() :: URI.t() | String.t()
```

# `conn`
*since 0.6.0* 

```elixir
@spec conn(
  url() | keyword() | Req.Conn.t(),
  keyword()
) :: Req.Conn.t()
```

Builds a `%Req.Conn{}`.

The first argument can be a URL string, a `%URI{}`, an existing
`%Req.Conn{}` (passed through), a keyword list of options, or omitted
(defaults to a bare conn with the default Finch adapter). The second
argument is a keyword list of additional options merged on top.

## Examples

    iex> Req.conn().method
    "GET"

    iex> conn = Req.conn("https://example.com/path?x=1")
    iex> conn.host
    "example.com"
    iex> conn.request_path
    "/path"
    iex> conn.query_string
    "x=1"

    iex> conn = Req.conn(method: :post, url: "https://example.com")
    iex> conn.method
    "POST"

    iex> conn = Req.conn("https://example.com", headers: [{"x-tag", "1"}])
    iex> Req.Conn.req_header_value(conn, "x-tag")
    "1"

# `default_options`

```elixir
@spec default_options() :: keyword()
```

Returns default options.

See `default_options/1` for more information.

# `default_options`

```elixir
@spec default_options(keyword()) :: :ok
```

Sets default options for `Req.new/1`.

Avoid setting default options in libraries as they are global.

## Examples

    iex> Req.default_options(base_url: "https://httpbin.org")
    iex> Req.get!("/statuses/201").status
    201
    iex> Req.new() |> Req.get!(url: "/statuses/201").status
    201

# `fetch`
*since 0.6.0* 

```elixir
@spec fetch(
  url() | keyword() | Req.Conn.t(),
  keyword()
) :: {:ok, Req.Conn.t()} | {:error, Req.Conn.t(), Exception.t()}
```

Builds a `%Req.Conn{}` from `arg` and `options` (see `conn/2`),
runs it through the pipeline, and returns `{:ok, conn}` or
`{:error, conn, exception}`.

# `fetch!`
*since 0.6.0* 

```elixir
@spec fetch!(
  url() | keyword() | Req.Conn.t(),
  keyword()
) :: Req.Conn.t()
```

Like `fetch/2` but returns the conn directly and raises on error.

# `assign`

> This function is deprecated. Use Req.Conn.assign/2.

```elixir
@spec assign(req_or_resp, assigns :: map() | keyword()) :: req_or_resp
when req_or_resp: Req.Request.t() | Req.Response.t()
```

# `assign`

> This function is deprecated. Use Req.Conn.assign/3.

```elixir
@spec assign(req_or_resp, key :: atom(), value :: term()) :: req_or_resp
when req_or_resp: Req.Request.t() | Req.Response.t()
```

# `assign_new`

> This function is deprecated. Use Req.Conn.assign_new/2.

```elixir
@spec assign_new(req_or_resp, assigns :: keyword() | map()) :: req_or_resp
when req_or_resp: Req.Request.t() | Req.Response.t()
```

# `assign_new`

> This function is deprecated. Use Req.Conn.assign_new/3.

```elixir
@spec assign_new(req_or_resp, key :: atom(), value :: term()) :: req_or_resp
when req_or_resp: Req.Request.t() | Req.Response.t()
```

# `cancel_async_response`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

Cancels an asynchronous response.

An asynchronous response is a result of request with `into: :self`.
See also `Req.Response.Async`.

## Examples

    iex> resp = Req.get!("http://httpbin.org/stream/2", into: :self)
    iex> Req.cancel_async_response(resp)
    :ok

# `delete`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec delete(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  {:ok, Req.Response.t()} | {:error, Exception.t()}
```

Makes a DELETE request and returns a response or an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> {:ok, resp} = Req.delete("https://httpbin.org/anything")
    iex> resp.body["method"]
    "DELETE"

With options:

    iex> {:ok, resp} = Req.delete(url: "https://httpbin.org/anything")
    iex> resp.body["method"]
    "DELETE"

With request struct:

    iex> req = Req.new(url: "https://httpbin.org/anything")
    iex> {:ok, resp} = Req.delete(req)
    iex> resp.body["method"]
    "DELETE"

# `delete!`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec delete!(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  Req.Response.t()
```

Makes a DELETE request and returns a response or raises an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> Req.delete!("https://httpbin.org/anything").body["method"]
    "DELETE"

With options:

    iex> Req.delete!(url: "https://httpbin.org/anything").body["method"]
    "DELETE"

With request struct:

    iex> req = Req.new(url: "https://httpbin.org/anything")
    iex> Req.delete!(req).body["method"]
    "DELETE"

# `get`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec get(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  {:ok, Req.Response.t()} | {:error, Exception.t()}
```

Makes a GET request and returns a response or an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> {:ok, resp} = Req.get("https://api.github.com/repos/wojtekmach/req")
    iex> resp.body["description"]
    "Req is a batteries-included HTTP client for Elixir."

With options:

    iex> {:ok, resp} = Req.get(url: "https://api.github.com/repos/wojtekmach/req")
    iex> resp.status
    200

With request struct:

    iex> req = Req.new(base_url: "https://api.github.com")
    iex> {:ok, resp} = Req.get(req, url: "/repos/elixir-lang/elixir")
    iex> resp.status
    200

# `get!`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec get!(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  Req.Response.t()
```

Makes a GET request and returns a response or raises an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> Req.get!("https://api.github.com/repos/wojtekmach/req").body["description"]
    "Req is a batteries-included HTTP client for Elixir."

With options:

    iex> Req.get!(url: "https://api.github.com/repos/wojtekmach/req").status
    200

With request struct:

    iex> req = Req.new(base_url: "https://api.github.com")
    iex> Req.get!(req, url: "/repos/elixir-lang/elixir").status
    200

# `get_headers_list`
*since 0.5.10* 

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec get_headers_list(Req.Request.t() | Req.Response.t()) :: [{binary(), binary()}]
```

Returns request/response headers as list.

## Examples

    iex> req = Req.Request.new(headers: %{"accept" => ["application/json"]})
    iex> Req.get_headers_list(req)
    [{"accept", "application/json"}]

    iex> resp = Req.Response.new(headers: %{"content-type" => ["application/json"]})
    iex> Req.get_headers_list(resp)
    [{"content-type", "application/json"}]

# `head`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec head(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  {:ok, Req.Response.t()} | {:error, Exception.t()}
```

Makes a HEAD request and returns a response or an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> {:ok, resp} = Req.head("https://httpbin.org/status/201")
    iex> resp.status
    201

With options:

    iex> {:ok, resp} = Req.head(url: "https://httpbin.org/status/201")
    iex> resp.status
    201

With request struct:

    iex> req = Req.new(base_url: "https://httpbin.org")
    iex> {:ok, resp} = Req.head(req, url: "/status/201")
    iex> resp.status
    201

# `head!`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec head!(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  Req.Response.t()
```

Makes a HEAD request and returns a response or raises an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> Req.head!("https://httpbin.org/status/201").status
    201

With options:

    iex> Req.head!(url: "https://httpbin.org/status/201").status
    201

With request struct:

    iex> req = Req.new(base_url: "https://httpbin.org")
    iex> Req.head!(req, url: "/status/201").status
    201

# `merge`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec merge(Req.Request.t(), options :: keyword()) :: Req.Request.t()
```

Updates a request struct.

See `new/1` for a list of available options. Also see `Req.Request` module documentation
for more information on the underlying request struct.

## Examples

    iex> req = Req.new(base_url: "https://httpbin.org")
    iex> req = Req.merge(req, auth: {:basic, "alice:secret"})
    iex> req.options[:base_url]
    "https://httpbin.org"
    iex> req.options[:auth]
    {:basic, "alice:secret"}

Passing `:headers` will automatically encode and merge them:

    iex> req = Req.new(headers: %{point_x: 1})
    iex> req = Req.merge(req, headers: %{point_y: 2})
    iex> req.headers
    %{"point-x" => ["1"], "point-y" => ["2"]}

The same header names are overwritten however:

    iex> req = Req.new(headers: %{authorization: "bearer foo"})
    iex> req = Req.merge(req, headers: %{authorization: "bearer bar"})
    iex> req.headers
    %{"authorization" => ["bearer bar"]}

Similarly to headers, `:params` are merged too:

    req = Req.new(url: "https://httpbin.org/anything", params: [a: 1, b: 1])
    req = Req.merge(req, params: [a: 2])
    Req.get!(req).body["args"]
    #=> %{"a" => "2", "b" => "1"}

# `new`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec new(options :: keyword()) :: Req.Request.t()
```

Returns a new request struct with built-in steps.

See `request/2`, `run/2`, as well as `get/2`, `post/2`, and similar functions for
making requests.

Also see `Req.Request` module documentation for more information on the underlying request
struct.

## Options

Basic request options:

  * `:method` - the request method, defaults to `:get`.

  * `:url` - the request URL.

  * `:headers` - the request headers as a `{key, value}` enumerable (e.g. map, keyword list).

    The header names should be downcased.

    The headers are automatically encoded using these rules:

      * atom header names are turned into strings, replacing `_` with `-`. For example,
        `:user_agent` becomes `"user-agent"`.

      * string header names are downcased.

      * `%DateTime{}` header values are encoded as "HTTP date".

    If you set `:headers` options both in `Req.new/1` and `request/2`, the header lists are merged.

    See also "Headers" section in the module documentation.

  * `:body` - the request body.

    Can be one of:

      * `nil` - no body is sent with the request.

      * `iodata` - request body as ["IO data"](https://hexdocs.pm/elixir/IO.html#module-io-data).

      * `enumerable` - stream request body chunks emitted by the given `Enumerable`.

      * `req_body_fun` - stream request body chunks from a 1-arity function.

        The function receives the `request` and should return one of:

          * `{:data, chunk, request}` - Emit request body `chunk` and continue streaming.

          * `{:done, request}` - request body streaming is done.

          * `{:halt, request}` - cancel request. On HTTP/1, this closes the connection.

        `req_body_fun` requires Finch main.

  * `:assigns` - shared user data as a map.

Additional URL options:

  * `:base_url` - if set, the request URL is prepended with this base URL (via
    [`put_base_url`](`Req.Steps.put_base_url/1`) step.)

  * `:params` - if set, appends parameters to the request query string (via
    [`put_params`](`Req.Steps.put_params/1`) step.)

  * `:path_params` - if set, uses a templated request path (via
    [`put_path_params`](`Req.Steps.put_path_params/1`) step.)

  * `:path_params_style` (*available since v0.5.1*) - how path params are expressed (via
    [`put_path_params`](`Req.Steps.put_path_params/1`) step). Can be one of:

       * `:colon` - (default) for Plug-style parameters, such as `:code` in
         `https://httpbin.org/status/:code`.

       * `:curly` - for [OpenAPI](https://swagger.io/specification/)-style parameters, such as
         `{code}` in `https://httpbin.org/status/{code}`.

Authentication options:

  * `:auth` - sets request authentication (via [`auth`](`Req.Steps.auth/1`) step.)

    Can be one of:

      * `{:basic, userinfo}` - uses Basic HTTP authentication.

      * `{:digest, userinfo}` - uses Digest HTTP authentication.

      * `{:bearer, token}` - uses Bearer HTTP authentication.

      * `:netrc` - load credentials from the default .netrc file.

      * `{:netrc, path}` - load credentials from `path`.

      * `string` - sets to this value.

      * `&fun/0` - a function that returns one of the above (such as a `{:bearer, token}`).

      * `{mod, fun, args}` - an MFArgs tuple that returns one of the above (such as a `{:bearer, token}`).

Request body encoding options ([`encode_body`](`Req.Steps.encode_body/1`)):

  * `:form` - if set, encodes the request body as `application/x-www-form-urlencoded`

  * `:form_multipart` - if set, encodes the request body as `multipart/form-data`.

  * `:json` - if set, encodes the request body as JSON

Other request body options:

  * `:compress_body` - if set to `true`, compresses the request body using gzip (via [`compress_body`](`Req.Steps.compress_body/1`) step.)
    Defaults to `false`.

AWS Signature Version 4 options ([`put_aws_sigv4`](`Req.Steps.put_aws_sigv4/1`) step):

  * `:aws_sigv4` - if set, the AWS options to sign request:

      * `:access_key_id` - the AWS access key id.

      * `:secret_access_key` - the AWS secret access key.

      * `:service` - the AWS service.

      * `:region` - if set, AWS region. Defaults to `"us-east-1"`.

      * `:datetime` - the request datetime, defaults to `DateTime.utc_now(:second)`.

Response body options:

  * `:compressed` - if set to `true`, asks the server to return compressed response.
    (via [`compressed`](`Req.Steps.compressed/1`) step.) Defaults to `true`.

  * `:raw` - if set to `true`, disables automatic body decompression
    ([`decompress_body`](`Req.Steps.decompress_body/1`) step) and decoding
    ([`decode_body`](`Req.Steps.decode_body/1`) step.) Defaults to `false`.

  * `:decode_body` - if set to `false`, disables automatic response body decoding.
    Defaults to `true`.

  * `:decode_json` - options to pass to `Jason.decode!/2`, defaults to `[]`.

  * `:into` - where to send the response body. It can be one of:

      * `nil` - (default) read the whole response body and store it in the `response.body`
        field.

      * `fun` - stream response body using a function. The first argument is a `{:data, data}`
        tuple containing the chunk of the response body. The second argument is a
        `{req, resp}` tuple. To continue streaming chunks, return `{:cont, {req, resp}}`.
        To cancel, return `{:halt, {req, resp}}`. For example:

            Req.request(
              req,
              into: fn {:data, data}, {req, resp} ->
                IO.puts(data)
                resp = Req.update_assign(resp, :count, 1, & &1 + 1)
                {:cont, {req, resp}}
              end
            )

      * `collectable` - stream response body into a `t:Collectable.t/0`. For example:

             into: File.stream!("path")

        Note that the collectable is only used, if the response status is 200. In other cases,
        the body is accumulated and processed as usual.

      * `:self` - stream response body into the current process mailbox.

        Received messages should be parsed with `Req.parse_message/2`.

        `response.body` is set to opaque data structure `Req.Response.Async` which implements
        `Enumerable` that receives and automatically parses messages. See module documentation
        for example usage.

        If the request is sent using HTTP/1, an extra process is spawned to consume messages
        from the underlying socket. On both HTTP/1 and HTTP/2 the messages are sent to the
        current process as soon as they arrive, as a firehose. If you wish to maximize request
        rate or have more control over how messages are streamed, use `into: fun` or
        `into: collectable` instead.

Response redirect options ([`redirect`](`Req.Steps.redirect/1`) step):

  * `:redirect` - if set to `false`, disables automatic response redirects. Defaults to `true`.

  * `:redirect_trusted` - by default, authorization credentials are only sent on redirects
    with the same host, scheme and port. If `:redirect_trusted` is set to `true`, credentials
    will be sent to any host.

  * `:max_redirects` - the maximum number of redirects, defaults to `10`.

Other response options:

  * `:expect` - the expected HTTP response status (via [`expect`](`Req.Steps.expect/1`) step).
    Can be an integer, a range, or a list of integers/ranges.

  * `:http_errors` - how to handle HTTP 4xx/5xx error responses (via
    [`handle_http_errors`](`Req.Steps.handle_http_errors/1`) step).
    Can be one of the following:

    * `:return` (default) - return the response

    * `:raise` - raise an error

Retry options ([`retry`](`Req.Steps.retry/1`) step):

  * `:retry` - can be one of the following:

      * `:safe_transient` (default) - retry safe (GET/HEAD) requests on one of:

          * HTTP 408/429/500/502/503/504 responses

          * `Req.TransportError` with `reason: :timeout | :econnrefused | :closed`

          * `Req.HTTPError` with `protocol: :http2, reason: :unprocessed`

      * `:transient` - same as `:safe_transient` except retries all HTTP methods (POST, DELETE, etc.)

      * `fun` - a 2-arity function that accepts a `Req.Request` and either a `Req.Response` or an exception struct
        and returns one of the following:

          * `true` - retry with the default delay controller by default delay option described below.

          * `{:delay, milliseconds}` - retry with the given delay.

          * `false/nil` - don't retry.

      * `false` - don't retry.

  * `:retry_delay` - if not set, which is the default, the retry delay is determined by
    the value of the `Retry-After` header on HTTP 429/503 responses. If the header is not set,
    the default delay follows a simple exponential backoff with jitter, for example:
    0.949s, 1.97s, 3.87s, 7.55s, ...

    `:retry_delay` can be set to a function that receives the retry count (starting at 0)
    and returns the delay, the number of milliseconds to sleep before making another attempt.

  * `:retry_log_level` - the log level to emit retry logs at. Can also be set to `false` to disable
    logging these messages. Defaults to `:warning`.

  * `:max_retries` - maximum number of retry attempts, defaults to `3` (for a total of `4`
    requests to the server, including the initial one.)

Caching options ([`cache`](`Req.Steps.cache/1`) step):

  * `:cache` - if `true`, performs HTTP caching. Defaults to `false`.

  * `:cache_dir` - the directory to store the cache, defaults to `<user_cache_dir>/req`
    (see: `:filename.basedir/3`)

Request adapters:

  * `:adapter` - adapter to use to make the actual HTTP request. See `:adapter` field description
    in the `Req.Request` module documentation for more information.

    The default is [`run_finch`](`Req.Steps.run_finch/1`).

  * `:plug` - if set, calls the given plug instead of making an HTTP request over the network (via [`run_plug`](`Req.Steps.run_plug/1`) step).

    The plug can be one of:

      * A _function_ plug: a `fun(conn)` or `fun(conn, options)` function that takes a
        `Plug.Conn` and returns a `Plug.Conn`.

      * A _module_ plug: a `module` name or a `{module, options}` tuple.

Finch options ([`run_finch`](`Req.Steps.run_finch/1`) step), see `Finch.start_link/1` for options:

  * `:finch` - the Finch pool to use. Defaults to pool automatically started by `Req`.

  * `:connect_options` - dynamically starts (or re-uses already started) Finch pool with
    the given connection options (see `Mint.HTTP.connect/4` for options):

      * `:timeout` - socket connect timeout in milliseconds, defaults to `30_000`.

      * `:protocols` - the HTTP protocols to use, defaults to
        `[:http1]`.

      * `:hostname` - Mint explicit hostname.

      * `:transport_opts` - Mint transport options.

      * `:proxy_headers` - Mint proxy headers.

      * `:proxy` - Mint HTTP/1 proxy settings, a `{scheme, address, port, options}` tuple.

      * `:client_settings` - Mint HTTP/2 client settings.

  * `:inet6` - if set to true, uses IPv6. Defaults to `false`.

  * `:pool_timeout` - pool checkout timeout in milliseconds, defaults to `5000`.

  * `:receive_timeout` - socket receive timeout in milliseconds, defaults to `15_000`.

  * `:request_timeout` - response timeout in milliseconds, defaults to `:infinity`.
    See `Finch.request/3`.

  * `:unix_socket` - if set, connect through the given UNIX domain socket.

  * `:pool_max_idle_time` - the maximum number of milliseconds that a pool can be
    idle before being terminated, used only by HTTP1 pools. Defaults to `:infinity`.

  * `:finch_private` - a map or keyword list of private metadata to add to the Finch request. May be useful
    for adding custom data when handling telemetry with `Finch.Telemetry`.

  * `:finch_request` - a function that executes the Finch request, defaults to using
    `Finch.request/3`.

## Examples

    iex> req = Req.new(url: "https://elixir-lang.org")
    iex> req.method
    :get
    iex> URI.to_string(req.url)
    "https://elixir-lang.org"

Fake adapter:

    iex> fake = fn request ->
    ...>   {request, Req.Response.new(status: 200, body: "it works!")}
    ...> end
    iex>
    iex> req = Req.new(adapter: fake)
    iex> Req.get!(req).body
    "it works!"

# `parse_message`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

Parses asynchronous response body message.

A request with option `:into` set to `:self` returns response with asynchronous body.
In that case, Req sends chunks to the calling process as messages. You'd typically
get them using `receive/1` or [`handle_info/2`](`c:GenServer.handle_info/2`) in a GenServer.
These messages should be parsed using this function. The possible return values are:

  * `{:ok, chunks}` - where a chunk can be `{:data, binary}`, `{:trailers, trailers}`, or
    `:done`.

  * `{:error, reason}` - an error occurred

  * `:unknown` - the message was not meant for this response.

See also `Req.Response.Async`.

## Examples

    iex> resp = Req.get!("http://httpbin.org/stream/2", into: :self)
    iex> Req.parse_message(resp, receive do message -> message end)
    {:ok, [data: "{"url": "http://httpbin.org/stream/2", ..., "id": 0}\n"]}
    iex> Req.parse_message(resp, receive do message -> message end)
    {:ok, [data: "{"url": "http://httpbin.org/stream/2", ..., "id": 1}\n"]}
    iex> Req.parse_message(resp, receive do message -> message end)
    {:ok, [:done]}
    iex> Req.parse_message(resp, :other)
    :unknown

# `patch`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec patch(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  {:ok, Req.Response.t()} | {:error, Exception.t()}
```

Makes a PATCH request and returns a response or an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> {:ok, resp} = Req.patch("https://httpbin.org/anything", body: "hello!")
    iex> resp.body["data"]
    "hello!"

With options:

    iex> {:ok, resp} = Req.patch(url: "https://httpbin.org/anything", body: "hello!")
    iex> resp.body["data"]
    "hello!"

With request struct:

    iex> req = Req.new(url: "https://httpbin.org/anything")
    iex> {:ok, resp} = Req.patch(req, body: "hello!")
    iex> resp.body["data"]
    "hello!"

# `patch!`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec patch!(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  Req.Response.t()
```

Makes a PATCH request and returns a response or raises an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> Req.patch!("https://httpbin.org/anything", body: "hello!").body["data"]
    "hello!"

With options:

    iex> Req.patch!(url: "https://httpbin.org/anything", body: "hello!").body["data"]
    "hello!"

With request struct:

    iex> req = Req.new(url: "https://httpbin.org/anything")
    iex> Req.patch!(req, body: "hello!").body["data"]
    "hello!"

# `post`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec post(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  {:ok, Req.Response.t()} | {:error, Exception.t()}
```

Makes a POST request and returns a response or an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> {:ok, resp} = Req.post("https://httpbin.org/anything", body: "hello!")
    iex> resp.body["data"]
    "hello!"

    iex> {:ok, resp} = Req.post("https://httpbin.org/anything", form: [x: 1])
    iex> resp.body["form"]
    %{"x" => "1"}

    iex> {:ok, resp} = Req.post("https://httpbin.org/anything", json: %{x: 2})
    iex> resp.body["json"]
    %{"x" => 2}

With options:

    iex> {:ok, resp} = Req.post(url: "https://httpbin.org/anything", body: "hello!")
    iex> resp.body["data"]
    "hello!"

With request struct:

    iex> req = Req.new(url: "https://httpbin.org/anything")
    iex> {:ok, resp} = Req.post(req, body: "hello!")
    iex> resp.body["data"]
    "hello!"

# `post!`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec post!(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  Req.Response.t()
```

Makes a POST request and returns a response or raises an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> Req.post!("https://httpbin.org/anything", body: "hello!").body["data"]
    "hello!"

    iex> Req.post!("https://httpbin.org/anything", form: [x: 1]).body["form"]
    %{"x" => "1"}

    iex> Req.post!("https://httpbin.org/anything", json: %{x: 2}).body["json"]
    %{"x" => 2}

With options:

    iex> Req.post!(url: "https://httpbin.org/anything", body: "hello!").body["data"]
    "hello!"

With request struct:

    iex> req = Req.new(url: "https://httpbin.org/anything")
    iex> Req.post!(req, body: "hello!").body["data"]
    "hello!"

# `put`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec put(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  {:ok, Req.Response.t()} | {:error, Exception.t()}
```

Makes a PUT request and returns a response or an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> {:ok, resp} = Req.put("https://httpbin.org/anything", body: "hello!")
    iex> resp.body["data"]
    "hello!"

With options:

    iex> {:ok, resp} = Req.put(url: "https://httpbin.org/anything", body: "hello!")
    iex> resp.body["data"]
    "hello!"

With request struct:

    iex> req = Req.new(url: "https://httpbin.org/anything")
    iex> {:ok, resp} = Req.put(req, body: "hello!")
    iex> resp.body["data"]
    "hello!"

# `put!`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec put!(url() | keyword() | Req.Request.t(), options :: keyword()) ::
  Req.Response.t()
```

Makes a PUT request and returns a response or raises an error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

## Examples

With URL:

    iex> Req.put!("https://httpbin.org/anything", body: "hello!").body["data"]
    "hello!"

With options:

    iex> Req.put!(url: "https://httpbin.org/anything", body: "hello!").body["data"]
    "hello!"

With request struct:

    iex> req = Req.new(url: "https://httpbin.org/anything")
    iex> Req.put!(req, body: "hello!").body["data"]
    "hello!"

# `request`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec request(request :: Req.Request.t() | keyword(), options :: keyword()) ::
  {:ok, Req.Response.t()} | {:error, Exception.t()}
```

Makes an HTTP request and returns a response or an error.

`request` can be one of:

  * a `Keyword` options;
  * a `Req.Request` struct

See `new/1` for a list of available options.

Also see `run/2` for a similar function that returns the request and the response or error.

## Examples

With options keywords list:

    iex> {:ok, response} = Req.request(url: "https://api.github.com/repos/wojtekmach/req")
    iex> response.status
    200
    iex> response.body["description"]
    "Req is a batteries-included HTTP client for Elixir."

With request struct:

    iex> req = Req.new(url: "https://api.github.com/repos/elixir-lang/elixir")
    iex> {:ok, response} = Req.request(req)
    iex> response.status
    200

# `request!`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec request!(request :: Req.Request.t() | keyword(), options :: keyword()) ::
  Req.Response.t()
```

Makes an HTTP request and returns a response or raises an error.

See `new/1` for a list of available options.

Also see `run!/2` for a similar function that returns the request and the response or error.

## Examples

With options keywords list:

    iex> Req.request!(url: "https://api.github.com/repos/elixir-lang/elixir").status
    200

With request struct:

    iex> req = Req.new(url: "https://api.github.com/repos/elixir-lang/elixir")
    iex> Req.request!(req).status
    200

# `run`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec run(request :: url() | keyword() | Req.Request.t(), options :: keyword()) ::
  {Req.Request.t(), Req.Response.t() | Exception.t()}
```

Makes an HTTP request and returns the request and response or error.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

Also see `request/2` for a similar function that returns the response or error
(without the request).

## Examples

With options keywords list:

    iex> {req, resp} = Req.run(url: "https://api.github.com/repos/elixir-lang/elixir")
    iex> req.url.host
    "api.github.com"
    iex> resp.status
    200

With request struct and options:

    iex> req = Req.new(base_url: "https://api.github.com")
    iex> {req, resp} = Req.run(req, url: "/repos/elixir-lang/elixir")
    iex> req.url.host
    "api.github.com"
    iex> resp.status
    200

Returns an error:

    iex> {_req, exception} = Req.run("http://localhost:9999", retry: false)
    iex> exception
    %Req.TransportError{reason: :econnrefused}

# `run!`

> This function is deprecated. See &quot;Upgrading to Req v0.6&quot; in the README.

```elixir
@spec run!(request :: url() | keyword() | Req.Request.t(), options :: keyword()) ::
  {Req.Request.t(), Req.Response.t()}
```

Makes an HTTP request and returns the request and response or raises on errors.

`request` can be one of:

  * an url (`String` or `URI`);

  * a `Keyword` options;

  * a `Req.Request` struct

See `new/1` for a list of available options.

Also see `request!/2` for a similar function that returns the response (without the request).

## Examples

With options keywords list:

    iex> {req, resp} = Req.run!(url: "https://api.github.com/repos/elixir-lang/elixir")
    iex> req.url.host
    "api.github.com"
    iex> resp.status
    200

With request struct and options:

    iex> req = Req.new(base_url: "https://api.github.com")
    iex> {req, resp} = Req.run!(req, url: "/repos/elixir-lang/elixir")
    iex> req.url.host
    "api.github.com"
    iex> resp.status
    200

Raises an error:

    iex> Req.run!("http://localhost:9999", retry: false)
    ** (Req.TransportError) connection refused

# `update_assign`

> This function is deprecated. Use Req.Conn.update_assign/3.

```elixir
@spec update_assign(req_or_resp, key :: atom(), (term() -&gt; term())) :: req_or_resp
when req_or_resp: Req.Request.t() | Req.Response.t()
```

# `update_assign`

> This function is deprecated. Use Req.Conn.update_assign/4.

```elixir
@spec update_assign(req_or_resp, key :: atom(), default :: term(), (term() -&gt; term())) ::
  req_or_resp
when req_or_resp: Req.Request.t() | Req.Response.t()
```

---

*Consult [api-reference.md](api-reference.md) for complete listing*
