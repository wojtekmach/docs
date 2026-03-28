# `ElixirKit.Rust`

Rust support for defining NIFs and ports.

## Automatic Type Encoding/Decoding

| Rust Type                      | Elixir Type               |
| ------------------------------ | ------------------------- |
| [`i64`]                        | `integer`                 |
| [`u64`]                        | `non_neg_integer`         |
| [`f64`]                        | `float`                   |
| [`bool`]                       | `boolean`                 |
| [`String`]                     | `binary`                  |
| [`Vec<u8>`]                    | `binary`                  |
| [`Vec<T>`]                     | `list(a)`                 |
| [`HashMap<K, V>`]              | `%{k => v}`               |
| [`(T0, T1, ...)`][tuple]       | `{a, b, ...}`             |
| [`Result<T, E>`]               | `{:ok, a} \| {:error, b}` |
| [`nif::Term`] / [`etf::Term`]  | `term`                    |

Borrowed views are available via [`nif::Term`]:

* [`&str`] via [`nif::Term::as_str`]
* `&[u8]` via [`nif::Term::as_bytes`]

<!--
Borrowed views are available via [`nif::Term`] / [`etf::Term`]:

* [`&str`] via [`nif::Term::as_str`] / [`etf::Term::as_str`]
* [`&[u8]`] via [`nif::Term::as_bytes`] / [`etf::Term::as_bytes`]
-->

Custom types can be encoded/decoded by implementing traits:

* [`nif::Encode`], [`nif::Decode`]
* [`etf::Encode`], [`etf::Decode`]

[`i64`]:            https://doc.rust-lang.org/std/primitive.i64.html
[`u64`]:            https://doc.rust-lang.org/std/primitive.u64.html
[`f64`]:            https://doc.rust-lang.org/std/primitive.f64.html
[`bool`]:           https://doc.rust-lang.org/std/primitive.bool.html
[`String`]:         https://doc.rust-lang.org/std/string/struct.String.html
[`Vec<u8>`]:        https://doc.rust-lang.org/std/vec/struct.Vec.html
[`Vec<T>`]:         https://doc.rust-lang.org/std/vec/struct.Vec.html
[`HashMap<K, V>`]:  https://doc.rust-lang.org/std/collections/struct.HashMap.html
[tuple]:            https://doc.rust-lang.org/std/primitive.tuple.html
[`&str`]:           https://doc.rust-lang.org/std/primitive.str.html
[`Result<T, E>`]:   https://doc.rust-lang.org/std/result/enum.Result.html

[`etf::Term`]:           rs/elixirkit/etf/enum.Term.html
[`etf::Encode`]:         rs/elixirkit/etf/trait.Decode.html
[`etf::Decode`]:         rs/elixirkit/etf/trait.Decode.html
[`nif::Term`]:           rs/elixirkit/nif/enum.Term.html
[`nif::Term::as_str`]:   rs/elixirkit/nif/enum.Term.html
[`nif::Term::as_bytes`]: rs/elixirkit/nif/enum.Term.html
[`nif::Decode`]:         rs/elixirkit/nif/trait.Decode.html
[`nif::Encode`]:         rs/elixirkit/nif/trait.Encode.html

## NIFs

NIFs, or Native Implemented Functions, are (...).

You can use `defnif/1` with [`~RS`](`sigil_RS/2`) sigil to (...).

### Setting `@nif_project`

`defnif/1` wraps given code in a temporary project. You can customize project layout by setting
`@nif_project` with a map of files:

    @nif_project %{
      "Cargo.toml" => "..."
      "build.rs" => "..."
    }

Or set it to a path:

    @nif_project "#{__DIR__}/../native"

### NIF Resource Objects

Resource Objects is a mechanism for passing pointers to native data structures from a NIF.

    defmodule Counter do
      use EasyRust.NIF

      defnif ~RS"""
      pub struct Counter {
          value: std::sync::atomic::AtomicI64,
      }

      #[nif_resource]
      impl Resource for Counter {}

      #[nif]
      pub fn new(value: i64) -> ResourceArc<Counter> {
          ResourceArc::new(Counter {
              value: std::sync::atomic::AtomicI64::new(value),
          })
      }

      #[nif]
      pub fn get(counter: ResourceArc<Counter>) -> i64 {
          counter.value.load(std::sync::atomic::Ordering::SeqCst)
      }

      #[nif]
      pub fn add(counter: ResourceArc<Counter>, incr: i64) -> i64 {
          counter.value.fetch_add(incr, std::sync::atomic::Ordering::SeqCst)
      }
      """
    end

    iex> counter = Counter.new(0)
    iex> Counter.get(counter)
    0
    iex> Counter.add(counter, 1)
    iex> Counter.get(counter)

See <https://www.erlang.org/doc/apps/erts/erl_nif.html#resource_objects> for more information.

### Examples

    defmodule ExampleNIF do
      use ElixirKit.Rust

      defnif(~RS"""
      #[nif]
      fn add(a: i64, b: i64) -> i64 {
          a + b
      }
      """)
    end

    iex> ExampleNIF.add(1, 2)
    3

`defnif/1` + `@nif_project`:

    defmodule ExampleNIF do
      use ElixirKit.Rust

      @nif_project %{
        "Cargo.toml" => """
        [package]
        name = "example"
        version = "0.1.0"
        edition = "2024"
        """
      }

      defnif(~RS"""
      #[nif]
      fn add(a: i64, b: i64) -> i64 {
          a + b
      }
      """)
    end

# `defnif`
*macro* 

Defines a NIF module from inline Rust code.

See ["NIFs"](#module-nifs) section for more information.

## Examples

    defmodule ExampleNIF do
      use ElixirKit.Rust

      defnif(~RS"""
      #[nif]
      fn add(a: i64, b: i64) -> i64 {
          a + b
      }
      """)
    end

    iex> ExampleNIF.add(1, 2)
    3

# `defport`
*macro* 

Defines a port module from inline Rust code.

## `@port_project`

`defport/1` wraps given code in a temporary project. You can customize project layout by setting
`@port_project` with a map of files:

    @port_project %{
      "Cargo.toml" => """
      [package]
      name = "example"
      version = "0.1.0"
      edition = "2024"
      """
    }

Or set it to a path:

    @port_project "#{__DIR__}/../native"

## Examples

    defmodule ExamplePort do
      use ElixirKit.Rust

      defport(~RS"""
      #[port::rpc]
      fn add(a: i64, b: i64) -> i64 {
          a + b
      }

      fn main() {
          port::run_rpc!();
      }
      """)
    end

    iex> port = ExamplePort.open()
    iex> ExamplePort.add(port, 1, 2)
    3

`defport/1` + `@port_project`:

    defmodule ExamplePort do
      use ElixirKit.Rust

      @port_project %{
        "Cargo.toml" => """
        [package]
        name = "example"
        version = "0.1.0"
        edition = "2024"
        """
      }

      defport(~RS"""
      #[port::rpc]
      fn add(a: i64, b: i64) -> i64 {
          a + b
      }

      fn main() {
          port::run_rpc!();
      }
      """)
    end

`@port_project` with path to project:

    defmodule ExamplePort do
      use ElixirKit.Rust

      @port_project "#{__DIR__}/../native"
    end

# `sigil_RS`
*macro* 

Define Rust code.

---

*Consult [api-reference.md](api-reference.md) for complete listing*
