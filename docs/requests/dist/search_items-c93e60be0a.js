searchNodes=[{"doc":"Yet another HTTP client.FeaturesExtensible via request, response, and error middlewareAutomatic body encoding/decoding (via the encode_request_body/2 and decode_response_body/2 middleware)Automatic compression/decompression (via the compress/2 and decompress/1 middleware)Retries on errors (via the retry/2 middleware)Request streaming (by setting body as {:stream, enumerable})Examplesiex&gt; Requests.get!(&quot;https://api.github.com/repos/elixir-lang/elixir&quot;).body[&quot;description&quot;] &quot;Elixir is a dynamic, functional language designed for building scalable and maintainable applications&quot; iex&gt; Requests.post!(&quot;https://httpbin.org/post&quot;, {:form, comments: &quot;hello!&quot;}).body[&quot;form&quot;] %{&quot;comments&quot; =&gt; &quot;hello!&quot;}CreditsRequestsTeslaFinch (and Mint &amp; NimblePool!)","ref":"Requests.html","title":"Requests","type":"module"},{"doc":"Compresses the request body with the given algorithms.Supported algorithms: &quot;gzip&quot;, &quot;x-gzip&quot;, &quot;deflate&quot;, and &quot;identity&quot;.This function also sets the appropriate content-encoding header (unless already set.)","ref":"Requests.html#compress/2","title":"Requests.compress/2","type":"function"},{"doc":"Decodes the response body based on the content-type header.Options:json_decoder - if set, used on the &quot;application/json*&quot; content type. Defaults to &amp;Jason.decode/1:csv_decoder - if set, used on the &quot;text/csv*&quot; content type. Defaults to &amp;NimbleCSV.RFC4180.parse_string(&amp;1, skip_headers: false)Examplesiex&gt; Requests.get!(&quot;https://httpbin.org/json&quot;).body %{...} iex&gt; Requests.get!(&quot;https://httpbin.org/json&quot;, json_decoder: fn _ -&gt; &quot;fake&quot; end).body &quot;fake&quot;","ref":"Requests.html#decode_response_body/2","title":"Requests.decode_response_body/2","type":"function"},{"doc":"Decompresses the response body based on the content-encoding header.Supported values: &quot;gzip&quot;, &quot;x-gzip&quot;, &quot;deflate&quot;, and &quot;identity&quot;.","ref":"Requests.html#decompress/1","title":"Requests.decompress/1","type":"function"},{"doc":"Adds default request headers.Currently these headers are added:&quot;user-agent&quot; - &quot;requests/0.1.0-dev&quot;&quot;accept-encoding&quot; - &quot;gzip&quot;","ref":"Requests.html#default_headers/1","title":"Requests.default_headers/1","type":"function"},{"doc":"Encodes the request body based on its shape.If body is of the following shape, it's encoded and its content-type set accordingly. Otherwise it's unchanged.ShapeEncoderContent-Type{:form, data}:form_encoder&quot;application/x-www-form-urlencoded&quot;{:json, data}:json_encoder&quot;application/json&quot;{:csv, rows}:csv_encoder&quot;text/csv&quot;{:csv, {:stream, rows}}:csv_stream_encoder&quot;text/csv&quot;Options:form_encoder - defaults to &amp;URI.encode_query/1.:json_encoder - defaults to &amp;Jason.encode_to_iodata!/1.:csv_encoder - defaults to &amp;NimbleCSV.RFC4180.dump_to_iodata/1.:csv_stream_encoder - defaults to &amp;NimbleCSV.RFC4180.dump_to_stream/1.Examplesiex&gt; Requests.post!(&quot;https://httpbin.org/post&quot;, {:form, comments: &quot;hello!&quot;}).body[&quot;form&quot;] %{&quot;comments&quot; =&gt; &quot;hello!&quot;}","ref":"Requests.html#encode_request_body/2","title":"Requests.encode_request_body/2","type":"function"},{"doc":"Makes a GET request.See request/4 for possible options.","ref":"Requests.html#get/2","title":"Requests.get/2","type":"function"},{"doc":"See get/2.","ref":"Requests.html#get!/2","title":"Requests.get!/2","type":"function"},{"doc":"Normalizes request headers.Turns atom header names into strings, e.g.: :user_agent becomes &quot;user-agent&quot;. Non-atom names are returned as is.","ref":"Requests.html#normalize_request_headers/1","title":"Requests.normalize_request_headers/1","type":"function"},{"doc":"Makes a POST request.See request/4 for possible options.","ref":"Requests.html#post/3","title":"Requests.post/3","type":"function"},{"doc":"See post/3.","ref":"Requests.html#post!/3","title":"Requests.post!/3","type":"function"},{"doc":"Makes a HTTP request.Returns {:ok, response} or {:error, exception}.Options::headers - list of request headers, defaults to [].:finch - name of the Finch pool to use, defaults to Requests.Finch that is started with the default options.:request_middleware - list of middleware to run the request through, defaults to using:normalize_request_headers/1default_headers/1encode_request_body/2 with optscompress/2 with opts[:compress] (if set):response_middleware - list of middleware to run the response through, defaults to using:retry/2 with opts (if retry: true or any of the retry_* options are set)decompress/1decode_response_body/2 with opts:error_middleware - list of middleware to run the error through, defaults to using:retry/2 with opts (if retry: true or any of the retry_* options are set)MiddlewareRequests supports request, response, and error middleware.A request middleware is any function that accepts and returns a possibly updated Finch.Request struct. An example is default_headers/1.A response middleware is any function that accepts and returns a possibly updated Finch.Response struct. An example is decompress/1.An error middleware is any function that accepts and returns a possibly updated exception struct. An example is retry/1.A response middleware may also return an exception in which case the final return value is switched to {:error, exception} however no further middleware is run on the exception. Similarly, an error middleware may return a response in which case the final return value is switched to {:ok, response} however no further middleware is run on the response.Notice that some of the built-in middleware functions take more than one argument. In order to use them, you have a couple options:use capture operator, for example: &amp;compress(&amp;1, [&quot;gzip&quot;])use a {module, function, args} tuple, where the first argument (request or response) will be automatically prepended, for example: {Requests, :compress, [&quot;gzip&quot;]}Exampleopts = [ request_middleware: [ &amp;Requests.default_headers/1, &amp;IO.inspect(&amp;1, label: :final_request), ], response_middleware: [ {IO, :inspect, [[label: :initial_response]]}, {Requests, :decode_response_body, []} ] ] Requests.get!(&quot;https://httpbin.org/json&quot;, opts) |&gt; IO.inspect(label: :final_response)","ref":"Requests.html#request/4","title":"Requests.request/4","type":"function"},{"doc":"Retries a request on errors.This function can be used as either or both response and error middleware. It retries a request that resulted in:response with status 5xxexceptionOptions:retry_max_count - maximum number of retries, defaults to: 2:retry_delay - sleep this number of milliseconds before making another attempt, defaults to 2000If all attempts have failed, returns Requests.TooManyFailedAttempts.","ref":"Requests.html#retry/2","title":"Requests.retry/2","type":"function"},{"doc":"","ref":"Requests.TooManyFailedAttempts.html","title":"Requests.TooManyFailedAttempts","type":"exception"}]