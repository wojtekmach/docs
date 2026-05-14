# `Req.Options`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/options.ex#L65)

Functions for validating and documenting options.

`Req.Options` is similar to `NimbleOptions` but it doesn't have all of its capabilities.
It's tailored to Req and uses type notation inspired by Elixir Set-Theoretic Types.

The `options/1` macro defines using `name :: type` with optional default value and documentation:

    options do
      username :: binary()

      @doc "The email address."
      email = nil :: binary() or nil

      @doc "The user role"
      @doc since: "1.1.0"
      role = :user :: :user or :admin

      @doc deprecated: "Use :email instead"
      email_address = nil :: binary() or nil
    end

Available types:

* `atom()`
* `integer()`
* `pos_integer()`
* `neg_integer()`
* `non_neg_integer()`
* `float()`
* `number()`
* `binary()`
* `boolean()`
* `list()`, `list(t)`
* `map()`
* `function()`, `&function/N` (function with the given arity)
* literals, e.g. `:get`, `1`, `"hello"`, `%{}` (matched with `===`)
* tuples, e.g. `{:ok, integer()}`
* structs, e.g. `%Date{}`
* unions, `t1 or t2`
* nested options, `options do ... end`
* `term()` (top type, matches anything)

Use `defoptions/1` to assign the schema to an `@options` module attribute, generate
documentation, and perform validation:

    defmodule MyReq do
      import Req.Options

      defoptions do
        url :: %URI{} or binary()

        method = :get :: :get or :post

        auth = false ::
          {:basic, binary()} or
            {:bearer, binary()} or
            false

        @doc "Follow redirects automatically. Set to `false` to disable."
        redirect = [max: 10] ::
          options do
            max = 10 :: pos_integer()

            @doc """
            When true, sensitive headers are kept across cross-origin requests.
            """
            trusted = false :: boolean()
          end or false
      end

      @doc """
      Performs the request.

      ## Options

      #{@options}
      """
      def request(options) do
        Req.Options.validate!(options, @options)
        ...
      end
    end

# `defoptions`
*macro* 

Defines an `@options` module attribute holding the schema.

Convenience for:

    @options (options do ... end)

See the module documentation for an example.

# `doc`

Renders schema documentation.

# `options`
*macro* 

Builds an options schema.

See the module documentation for the syntax.

# `validate`

Validates `options` against the schema, applying defaults.

Returns `{:ok, options}` on success, or `{:error, %ArgumentError{}}` if options contain
unknown keys, are missing required keys, or have invalid values.

## Options

  * `:into` - data structure to collect validated options into. Either `[]` (keyword list,
    the default) or `%{}` (map). Nested options follow the same shape.

## Examples

    iex> require Req.Options
    iex> schema =
    ...>   Req.Options.options do
    ...>     name :: binary()
    ...>     age = 0 :: non_neg_integer()
    ...>   end
    iex> Req.Options.validate([name: "Alice"], schema)
    {:ok, [name: "Alice", age: 0]}

`:into` set to `%{}`:

    iex> require Req.Options
    iex> schema =
    ...>   Req.Options.options do
    ...>     user ::
    ...>       options do
    ...>         name :: binary()
    ...>         age = 0 :: non_neg_integer()
    ...>       end
    ...>   end
    iex> Req.Options.validate([user: [name: "Alice"]], schema, into: %{})
    {:ok, %{user: %{name: "Alice", age: 0}}}

# `validate!`

Validates `options` against the schema, applying defaults.

Raises `ArgumentError` if options contain unknown keys, are missing required keys, or have
invalid values.

Accepts the same options as `validate/3`.

---

*Consult [api-reference.md](api-reference.md) for complete listing*
