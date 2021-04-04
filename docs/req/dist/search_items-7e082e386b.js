searchNodes=[{"doc":"An HTTP client with a focus on composability, built on top of Finch.This is a work in progress!FeaturesExtensibility via request, response, and error stepsAutomatic body decompression (via decompress/2 step)Automatic body encoding and decoding (via encode/1 and decode/2 steps)Encode params as query string (via params/2 step)Basic authentication (via auth/2 step)Follows redirects (via follow_redirects/2 step)Retries on errors (via retry/3 step)High-level APIReq.get!(&quot;https://api.github.com/repos/elixir-lang/elixir&quot;).body[&quot;description&quot;] #=&gt; &quot;Elixir is a dynamic, functional language designed for building scalable and maintainable applications&quot;Low-level APIUnder the hood, Req works by passing a request through a series of steps.The request struct, %Req.Request{}, initially contains data like HTTP method and request headers. You can also add request, response, and error steps to it.Request steps are used to refine the data that will be sent to the server.After making the actual HTTP request, we'll either get a HTTP response or an error. The request, along with the response or error, will go through response or error steps, respectively.Nothing is actually executed until we run the pipeline with Req.run/1.Example:Req.build(:get, &quot;https://api.github.com/repos/elixir-lang/elixir&quot;) |&gt; Req.add_request_steps([ &amp;Req.default_headers/1 ]) |&gt; Req.add_response_steps([ &amp;Req.decode/2 ]) |&gt; Req.run() #=&gt; {:ok, %{body: %{&quot;description&quot; =&gt; &quot;Elixir is a dynamic,&quot; &lt;&gt; ...}, ...}, ...}The high-level API shown before:Req.get!(&quot;https://api.github.com/repos/elixir-lang/elixir&quot;)is equivalent to this composition of lower-level API functions:Req.build(:get, &quot;https://api.github.com/repos/elixir-lang/elixir&quot;) |&gt; Req.add_default_steps() |&gt; Req.run!()(See Req.build/3, Req.add_default_steps/1, and Req.run!/1 for more information.)We can also build more complex flows like returning a response from a request step or an error from a response step. We will explore those next.Request stepsA request step is a function that accepts a request and returns one of the following:A requestA {request, response_or_error} tuple. In that case no further request steps are executed and the return value goes through response or error stepsExamples:def default_headers(request) do update_in(request.headers, &amp;[{&quot;user-agent&quot;, &quot;req/0.1.0-dev&quot;} | &amp;1]) end def read_from_cache(request) do case ResponseCache.fetch(request) do {:ok, response} -&gt; {request, response} :error -&gt; request end endResponse and error stepsA response step is a function that accepts a request and a response and returns one of the following:A {request, response} tupleA {request, exception} tuple. In that case, no further response steps are executed but the exception goes through error stepsSimilarly, an error step is a function that accepts a request and an exception and returns one of the following:A {request, exception} tupleA {request, response} tuple. In that case, no further error steps are executed but the response goes through response stepsExamples:def decode(request, response) do case List.keyfind(response.headers, &quot;content-type&quot;, 0) do {_, &quot;application/json&quot; &lt;&gt; _} -&gt; {request, update_in(response.body, &amp;Jason.decode!/1)} _ -&gt; {request, response} end end def log_error(request, exception) do Logger.error([&quot;\#{request.method} \#{request.url}: &quot;, Exception.message(exception)]) {request, exception} endHaltingAny step can call Req.Request.halt/1 to halt the pipeline. This will prevent any further steps from being invoked.Examples:def circuit_breaker(request) do if CircuitBreaker.open?() do {Req.Request.halt(request), RuntimeError.exception(&quot;circuit breaker is open&quot;)} else request end end","ref":"Req.html","title":"Req","type":"module"},{"doc":"Adds steps that should be reasonable defaults for most users.Request steps:normalize_headers/1default_headers/1encode/1&amp;auth(&amp;1, options[:auth]) (if options[:auth] is set)&amp;params(&amp;1, options[:params]) (if options[:params] is set)Response steps:&amp;retry(&amp;1, &amp;2, options[:retry]) (if options[:retry] is set and is a keywords list or an atom true)follow_redirects/2decompress/2decode/2Error steps:&amp;retry(&amp;1, &amp;2, options[:retry]) (if options[:retry] is set and is a keywords list or an atom true)","ref":"Req.html#add_default_steps/2","title":"Req.add_default_steps/2","type":"function"},{"doc":"Adds error steps.","ref":"Req.html#add_error_steps/2","title":"Req.add_error_steps/2","type":"function"},{"doc":"Adds request steps.","ref":"Req.html#add_request_steps/2","title":"Req.add_request_steps/2","type":"function"},{"doc":"Adds response steps.","ref":"Req.html#add_response_steps/2","title":"Req.add_response_steps/2","type":"function"},{"doc":"Sets request authentication.auth can be one of:{username, password} - uses Basic HTTP authenticationExamplesiex&gt; Req.get!(&quot;https://httpbin.org/basic-auth/foo/bar&quot;, auth: {&quot;bad&quot;, &quot;bad&quot;}).status 401 iex&gt; Req.get!(&quot;https://httpbin.org/basic-auth/foo/bar&quot;, auth: {&quot;foo&quot;, &quot;bar&quot;}).status 200","ref":"Req.html#auth/2","title":"Req.auth/2","type":"function"},{"doc":"Builds a request pipeline.Options:header - request headers, defaults to []:body - request body, defaults to &quot;&quot;","ref":"Req.html#build/3","title":"Req.build/3","type":"function"},{"doc":"Decodes the response body based on the content-type header.Supported formats:FormatDecoderJSONJason.decode!/1gzip:zlib.gunzip/1csvNimbleCSV.RFC4180.parse_string/2 (if NimbleCSV is installed)Examplesiex&gt; Req.get!(&quot;https://hex.pm/api/packages/finch&quot;).body[&quot;meta&quot;] %{ &quot;description&quot; =&gt; &quot;An HTTP client focused on performance.&quot;, &quot;licenses&quot; =&gt; [&quot;MIT&quot;], &quot;links&quot; =&gt; %{&quot;GitHub&quot; =&gt; &quot;https://github.com/keathley/finch&quot;}, ... }","ref":"Req.html#decode/2","title":"Req.decode/2","type":"function"},{"doc":"Decompresses the response body based on the content-encoding header.","ref":"Req.html#decompress/2","title":"Req.decompress/2","type":"function"},{"doc":"Adds common request headers.Currently the following headers are added:&quot;user-agent&quot; - &quot;req/0.1.0-dev&quot;&quot;accept-encoding&quot; - &quot;gzip&quot;","ref":"Req.html#default_headers/1","title":"Req.default_headers/1","type":"function"},{"doc":"Encodes the request body based on its shape.If body is of the following shape, it's encoded and its content-type set accordingly. Otherwise it's unchanged.ShapeEncoderContent-Type{:form, data}URI.encode_query/1&quot;application/x-www-form-urlencoded&quot;{:json, data}Jason.encode_to_iodata!/1&quot;application/json&quot;Examplesiex&gt; Req.post!(&quot;https://httpbin.org/post&quot;, {:form, comments: &quot;hello!&quot;}).body[&quot;form&quot;] %{&quot;comments&quot; =&gt; &quot;hello!&quot;}","ref":"Req.html#encode/1","title":"Req.encode/1","type":"function"},{"doc":"Follows redirects.Examplesiex&gt; Req.get!(&quot;http://api.github.com&quot;).status # 23:24:11.670 [info] Redirecting to https://api.github.com/ 200","ref":"Req.html#follow_redirects/2","title":"Req.follow_redirects/2","type":"function"},{"doc":"Makes a GET request.See request/3 for a list of supported options.","ref":"Req.html#get!/2","title":"Req.get!/2","type":"function"},{"doc":"Normalizes request headers.Turns atom header names into strings, e.g.: :user_agent becomes &quot;user-agent&quot;. Non-atom names are returned as is.Examplesiex&gt; Req.get!(&quot;https://httpbin.org/headers&quot;, headers: [x_foo: &quot;bar&quot;]).body[&quot;headers&quot;] %{ &quot;X-Foo&quot; =&gt; &quot;bar&quot;, ... }","ref":"Req.html#normalize_headers/1","title":"Req.normalize_headers/1","type":"function"},{"doc":"Adds params to request query string.Examplesiex&gt; Req.get!(&quot;https://httpbin.org/anything/query&quot;, params: [x: &quot;1&quot;, y: &quot;2&quot;]).body[&quot;args&quot;] %{&quot;x&quot; =&gt; &quot;1&quot;, &quot;y&quot; =&gt; &quot;2&quot;}","ref":"Req.html#params/2","title":"Req.params/2","type":"function"},{"doc":"Makes a POST request.See request/3 for a list of supported options.","ref":"Req.html#post!/3","title":"Req.post!/3","type":"function"},{"doc":"Makes an HTTP request.Options:header - request headers, defaults to []:body - request body, defaults to &quot;&quot;The options are passed down to add_default_steps/1 so see the documentation of that function for more information.","ref":"Req.html#request/3","title":"Req.request/3","type":"function"},{"doc":"Retries a request in face of errors.This function can be used as either or both response and error step. It retries a request that resulted in:a response with status 5xxan exceptionOptions:delay - sleep this number of milliseconds before making another attempt, defaults to 2000:max_attempts - maximum number of attempts, defaults to 2ExamplesWith default options:iex&gt; Req.get!(&quot;https://httpbin.org/status/500,200&quot;, retry: true) # 19:02:08.463 [error] Got response with status 500. Will retry in 2000ms, 2 attempts left # 19:02:10.710 [error] Got response with status 500. Will retry in 2000ms, 1 attempt left %Finch.Response{ body: &quot;&quot;, headers: [ {&quot;date&quot;, &quot;Thu, 01 Apr 2021 16:39:02 GMT&quot;}, ... ], status: 200 }With custom options:iex&gt; Req.request(:get, &quot;http://localhost:9999&quot;, retry: [delay: 100, max_attempts: 1]) # 19:04:13.163 [error] Got exception. Will retry in 100ms, 1 attempt left # 19:04:13.164 [error] ** (Mint.TransportError) connection refused {:error, %Mint.TransportError{reason: :econnrefused}}","ref":"Req.html#retry/3","title":"Req.retry/3","type":"function"},{"doc":"Runs a request pipeline.Returns {:ok, response} or {:error, exception}.","ref":"Req.html#run/1","title":"Req.run/1","type":"function"},{"doc":"Runs a request pipeline and returns a response or raises an error.See run/1.","ref":"Req.html#run!/1","title":"Req.run!/1","type":"function"},{"doc":"","ref":"Req.Request.html","title":"Req.Request","type":"module"},{"doc":"Gets the value for a specific private key.","ref":"Req.Request.html#get_private/3","title":"Req.Request.get_private/3","type":"function"},{"doc":"Halts the request pipeline preventing any further steps from executing.","ref":"Req.Request.html#halt/1","title":"Req.Request.halt/1","type":"function"},{"doc":"Assigns a new private key and value.","ref":"Req.Request.html#put_private/3","title":"Req.Request.put_private/3","type":"function"}]