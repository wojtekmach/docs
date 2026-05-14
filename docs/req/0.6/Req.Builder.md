# `Req.Builder`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/builder.ex#L1)

Conveniences for building Req plug pipelines at compile time.

## Example

    defmodule MyApp.Req do
      use Req.Builder

      plug :tag_request
      plug Req
      plug :record_metric
    end

## Plug shapes

  * **Module plug** — `init/1` + `call/2`, like `Plug`. (`Req.Plug`)
  * **Function plug** — `(conn, options) -> conn`.
  * **Wrapper** — module implementing `Req.Plug.Wrapper` (`init/1` + `wrap/3`),
    receives a continuation and may invoke it any number of times.

Every plug receives the full runtime `options` keyword as its second
argument; it reads whatever keys it cares about.

# `options_docs`
*since 0.6.0* 

Renders the merged options schema for `mod` as a markdown list.

# `pipeline_docs`
*since 0.6.0* 

Renders the pipeline diagram for `mod` as a markdown code block.

# `plug`
*since 0.6.0* *macro* 

Adds a plug to the pipeline.

---

*Consult [api-reference.md](api-reference.md) for complete listing*
