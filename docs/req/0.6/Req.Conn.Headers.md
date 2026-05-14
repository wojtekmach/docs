# `Req.Conn.Headers`
[🔗](https://github.com/wojtekmach/req/blob/v0.6.0-dev/lib/req/conn/headers.ex#L1)

Opaque container for Req request/response headers.

Implements `Enumerable` and `Access`. Lookups are case-insensitive.
`headers["x"]` returns the first matching value.

# `t`
*since 0.6.0* 

```elixir
@opaque t()
```

# `delete`
*since 0.6.0* 

```elixir
@spec delete(t(), String.t()) :: t()
```

# `drop`
*since 0.6.0* 

```elixir
@spec drop(t(), [String.t()]) :: t()
```

# `get`
*since 0.6.0* 

```elixir
@spec get(t(), String.t()) :: String.t() | nil
```

# `get_values`
*since 0.6.0* 

```elixir
@spec get_values(t(), String.t()) :: [String.t()]
```

# `new`
*since 0.6.0* 

```elixir
@spec new(Enumerable.t() | t()) :: t()
```

Builds a new headers container from an enumerable of `{name, value}` pairs.

Names are normalized to lowercase. Atom names have `_` replaced with `-`.

# `put`
*since 0.6.0* 

```elixir
@spec put(t(), String.t(), String.t()) :: t()
```

# `put_new`
*since 0.6.0* 

```elixir
@spec put_new(t(), String.t(), String.t()) :: t()
```

# `replace`
*since 0.6.0* 

```elixir
@spec replace(t(), String.t(), String.t()) :: t()
```

# `to_list`
*since 0.6.0* 

```elixir
@spec to_list(t()) :: [{String.t(), String.t()}]
```

# `update`
*since 0.6.0* 

```elixir
@spec update(t(), String.t(), String.t(), (String.t() -&gt; String.t())) :: t()
```

---

*Consult [api-reference.md](api-reference.md) for complete listing*
