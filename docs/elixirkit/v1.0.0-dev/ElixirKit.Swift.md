# `ElixirKit.Swift`

ElixirKit Swift support.

See `defnif/1` for more info on NIFs and `defport/1` for more info on ports.

# `defnif`
*macro* 

Defines a NIF module from inline Swift code.

## `@nif_project`

`defnif/1` wraps given code in a temporary project. You can customize project layout by setting
`@nif_project` with a map of files:

    @nif_project %{
      "Package.swift" => """
      // swift-tools-version: 6.0
      import PackageDescription
      let package = Package(name: "Example")
      """
    }

Or set it to a path:

    @nif_project "#{__DIR__}/../native"

## Examples

    defmodule ExampleNIF do
      use ElixirKit.Swift

      defnif(~SW"""
      @nif
      func add(a: Int64, b: Int64) -> Int64 {
          return a + b
      }
      """)
    end

    iex> ExampleNIF.add(1, 2)
    3

`defnif/1` + `@nif_project`:

    defmodule ExampleNIF do
      use ElixirKit.Swift

      @nif_project %{
        "Package.swift" => """
        // swift-tools-version: 6.0
        import PackageDescription
        let package = Package(name: "Example")
        """
      }

      defnif(~SW"""
      @nif
      func add(a: Int64, b: Int64) -> Int64 {
          return a + b
      }
      """)
    end

`@nif_project` with path to project:

    defmodule ExampleNIF do
      use ElixirKit.Swift

      @nif_project "#{__DIR__}/../native"
    end

# `defport`
*macro* 

Defines a port module from inline Swift code.

## `@port_project`

`defport/1` wraps given code in a temporary project. You can customize project layout by setting
`@port_project` with a map of files:

    @port_project %{
      "Package.swift" => """
      // swift-tools-version: 6.0
      import PackageDescription
      let package = Package(name: "Example")
      """
    }

Or set it to a path:

    @port_project "#{__DIR__}/../native"

## Examples

    defmodule ExamplePort do
      use ElixirKit.Swift

      defport(~SW"""
      @rpc
      func add(a: Int64, b: Int64) -> Int64 {
          return a + b
      }

      Port.runRPC()
      """)
    end

    iex> port = ExamplePort.open()
    iex> ExamplePort.add(port, 1, 2)
    3

`defport/1` + `@port_project`:

    defmodule ExamplePort do
      use ElixirKit.Swift

      @port_project %{
        "Package.swift" => """
        // swift-tools-version: 6.0
        import PackageDescription
        let package = Package(name: "Example")
        """
      }

      defport(~SW"""
      @rpc
      func add(a: Int64, b: Int64) -> Int64 {
          return a + b
      }

      Port.runRPC()
      """)
    end

`@port_project` with path to project:

    defmodule ExamplePort do
      use ElixirKit.Swift

      @port_project "#{__DIR__}/../native"
    end

# `sigil_SW`
*macro* 

Define Swift code.

---

*Consult [api-reference.md](api-reference.md) for complete listing*
