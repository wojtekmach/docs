# `Req.Conn`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/conn.ex#L1)

The Req connection struct.

Standalone struct (no `Plug.Conn` dependency) used by Req's pipeline.

Public fields: `:scheme`, `:host`, `:port`, `:request_path`, `:query_string`,
`:assigns`, `:private`. Headers are accessed via the helpers in this module
(`req_header_value/2`, `put_req_header/3`, etc.).

# `t`
*since 0.6.0* 

```elixir
@type t() :: %Req.Conn{
  adapter: module() | nil,
  assigns: map(),
  halted: boolean(),
  host: String.t() | nil,
  method: String.t(),
  port: non_neg_integer() | nil,
  private: map(),
  query_string: String.t(),
  req_body: iodata() | nil,
  req_headers: Req.Conn.Headers.t(),
  request_path: String.t(),
  resp_body: term(),
  resp_headers: Req.Conn.Headers.t(),
  scheme: :http | :https | nil,
  status: non_neg_integer() | nil
}
```

# `delete_req_header`
*since 0.6.0* 

```elixir
@spec delete_req_header(t(), String.t()) :: t()
```

Deletes all values of the request header `name`.

# `delete_resp_header`
*since 0.6.0* 

```elixir
@spec delete_resp_header(t(), String.t()) :: t()
```

Deletes all values of the response header `name`.

# `drop_req_headers`
*since 0.6.0* 

```elixir
@spec drop_req_headers(t(), [String.t()]) :: t()
```

Drops all values of the listed request headers.

# `drop_resp_headers`
*since 0.6.0* 

```elixir
@spec drop_resp_headers(t(), [String.t()]) :: t()
```

Drops all values of the listed response headers.

# `put_new_req_header`
*since 0.6.0* 

```elixir
@spec put_new_req_header(t(), String.t(), String.t()) :: t()
```

Adds a request header only if `name` is not already set.

# `put_new_resp_header`
*since 0.6.0* 

```elixir
@spec put_new_resp_header(t(), String.t(), String.t()) :: t()
```

Adds a response header only if `name` is not already set.

# `put_req_header`
*since 0.6.0* 

```elixir
@spec put_req_header(t(), String.t(), String.t()) :: t()
```

Adds a request header. Multiple values for the same name are kept.

# `put_resp_header`
*since 0.6.0* 

```elixir
@spec put_resp_header(t(), String.t(), String.t()) :: t()
```

Adds a response header. Multiple values for the same name are kept.

# `replace_req_header`
*since 0.6.0* 

```elixir
@spec replace_req_header(t(), String.t(), String.t()) :: t()
```

Replaces all values of the request header `name` with `value`.

# `replace_resp_header`
*since 0.6.0* 

```elixir
@spec replace_resp_header(t(), String.t(), String.t()) :: t()
```

Replaces all values of the response header `name` with `value`.

# `req_header_value`
*since 0.6.0* 

```elixir
@spec req_header_value(t(), String.t()) :: String.t() | nil
```

Returns the first value of the request header `name`, or `nil` if absent.

# `resp_header_value`
*since 0.6.0* 

```elixir
@spec resp_header_value(t(), String.t()) :: String.t() | nil
```

Returns the first value of the response header `name`, or `nil` if absent.

# `update_req_header`
*since 0.6.0* 

```elixir
@spec update_req_header(t(), String.t(), String.t(), (String.t() -&gt; String.t())) ::
  t()
```

Updates the existing value of the request header `name` with `fun`,
inserting `default` when not present.

# `update_resp_header`
*since 0.6.0* 

```elixir
@spec update_resp_header(t(), String.t(), String.t(), (String.t() -&gt; String.t())) ::
  t()
```

Updates the existing value of the response header `name` with `fun`,
inserting `default` when not present.

# `assign`
*since 0.6.0* 

```elixir
@spec assign(t(), assigns :: map() | keyword()) :: t()
```

Assigns multiple values to the conn.

## Examples

    iex> conn = Req.conn()
    iex> conn.assigns
    %{}
    iex> conn = Req.Conn.assign(conn, a: 1, b: 2)
    iex> conn.assigns
    %{a: 1, b: 2}

# `assign`
*since 0.6.0* 

```elixir
@spec assign(t(), key :: atom(), value :: term()) :: t()
```

Assigns key/value to the conn.

## Examples

    iex> conn = Req.conn()
    iex> conn.assigns
    %{}
    iex> conn = Req.Conn.assign(conn, :a, 1)
    iex> conn.assigns
    %{a: 1}

# `assign_new`
*since 0.6.0* 

```elixir
@spec assign_new(t(), assigns :: keyword() | map()) :: t()
```

Assigns multiple keys/values to the conn unless they are already set.

## Examples

    iex> conn = Req.conn()
    iex> conn.assigns
    %{}
    iex> conn = Req.Conn.assign_new(conn, a: 1)
    iex> conn.assigns
    %{a: 1}
    iex> conn = Req.Conn.assign_new(conn, a: 2, b: 2)
    iex> conn.assigns
    %{a: 1, b: 2}

# `assign_new`
*since 0.6.0* 

```elixir
@spec assign_new(t(), key :: atom(), value :: term()) :: t()
```

Assigns key/value to the conn unless `key` is already set.

## Examples

    iex> conn = Req.conn()
    iex> conn.assigns
    %{}
    iex> conn = Req.Conn.assign_new(conn, :a, 1)
    iex> conn.assigns
    %{a: 1}
    iex> conn = Req.Conn.assign_new(conn, :a, 2)
    iex> conn.assigns
    %{a: 1}

# `update_assign`
*since 0.6.0* 

```elixir
@spec update_assign(t(), key :: atom(), (term() -&gt; term())) :: t()
```

Updates assign `key` with the given function.

Raises if the `key` is not set.

See also `update_assign/4`.

## Examples

    iex> conn = Req.conn(assigns: [a: 1])
    iex> conn = Req.Conn.update_assign(conn, :a, & &1 * 2)
    iex> conn.assigns
    %{a: 2}

    iex> conn = Req.conn(assigns: [a: 1])
    iex> Req.Conn.update_assign(conn, :b, & &1 * 2)
    ** (KeyError) key :b not found in:
    ...

# `update_assign`
*since 0.6.0* 

```elixir
@spec update_assign(t(), key :: atom(), default :: term(), (term() -&gt; term())) :: t()
```

Updates assign `key` with the given function or `default`.

If `key` is present in assigns then the existing value is passed to `fun` and
its result is used as the updated value of `key`. If `key` is not present in
assigns, `default` is inserted as the value of `key`. The `default` value
will not be passed through the update function.

See also `update_assign/3`.

## Examples

    iex> conn = Req.conn(assigns: [a: 10])
    iex> conn = Req.Conn.update_assign(conn, :a, 1, & &1 + 1)
    iex> conn = Req.Conn.update_assign(conn, :b, 1, & &1 + 1)
    iex> conn.assigns
    %{a: 11, b: 1}

---

*Consult [api-reference.md](api-reference.md) for complete listing*
