# Req

[![CI](https://github.com/wojtekmach/req/actions/workflows/ci.yml/badge.svg)](https://github.com/wojtekmach/req/actions/workflows/ci.yml)
[![License](https://img.shields.io/hexpm/l/req.svg)](https://github.com/wojtekmach/req/blob/main/LICENSE.md)
[![Version](https://img.shields.io/hexpm/v/req.svg)](https://hex.pm/packages/req)
[![Hex Docs](https://img.shields.io/badge/documentation-gray.svg)](https://hexdocs.pm/req)

Req is a batteries-included HTTP client for Elixir.

TODO

## TODO

- Changelog: retry behaviour is changing — transport errors mid-stream (after the response status was received) are no longer retried.

- Should options never be `nil` values? And setting `nil` mean "unset this option"? It'd be nice to write `Req.fetch(auth: x && x.auth)` without thinking — if `x` is nil, just drop `:auth`. Types stay clean (no `... or nil` smeared everywhere) and the `&&` pattern just works.

  However, for on-by-default options like `:redirect`, `redirect: x && x.redirect` could evaluate to `nil`, meaning redirects are enabled, but the user might have thought `nil` _disables_ them.

## Related Packages

There are many packages that extend the Req library. To get yours listed here, send a PR.

  * [`req_easyhtml`]
  * [`req_s3`]
  * [`req_hex`]
  * [`req_github_oauth`]
  * [`curl_req`]
  * [`http_cookie`]
  * [`req_embed`]
  * [`req_proxy`]

## Presentations

  * [Building API Clients with Req -- ElixirConf EU 2024](https://www.youtube.com/watch?v=AexE5JKpNvA)
  * [Req: A batteries-included HTTP client for Elixir -- ElixirConf 2023](https://www.youtube.com/watch?v=owz2QacFuoQ)

## Upgrading to Req v0.6

TODO

## Acknowledgments

Req is built on top of [Finch] and is inspired by [cURL], [Requests], [Tesla], and many other HTTP clients - thank you!

## License

Copyright (c) 2021 Wojtek Mach

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[Finch]: https://github.com/sneako/finch
[cURL]: https://curl.se
[Requests]: https://docs.python-requests.org/en/master/
[Tesla]: https://github.com/elixir-tesla/tesla
[`req_easyhtml`]: https://github.com/wojtekmach/req_easyhtml
[`req_s3`]: https://github.com/wojtekmach/req_s3
[`req_hex`]: https://github.com/wojtekmach/req_hex
[`req_github_oauth`]: https://github.com/wojtekmach/req_github_oauth
[`curl_req`]: https://github.com/derekkraan/curl_req
[`http_cookie`]: https://github.com/reisub/http_cookie
[`req_embed`]: https://github.com/leandrocp/req_embed
[`req_proxy`]: https://gitlab.com/wmde/technical-wishes/req_proxy
