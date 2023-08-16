# Contracts API Clients
Contracts API Clients

## Structure
* [contracts-api-client-trpc](./contracts-api-client-trpc/): TRPC Client
* [contracts-api-openapi-gen](./contracts-api-openapi-gen/): OpenAPI Generator configs

## Generate
https://openapi-generator.tech/docs/usage#generate

### Install CLI + Java
```
pnpm install @openapitools/openapi-generator-cli -g
sudo apt install -y default-jre
```

### Generate
We use the batch command.
```
openapi-generator-cli batch contracts-api-openapi-gen/*.yaml
```

### Generators
**Used**
* [android](https://openapi-generator.tech/docs/generators/android/)
* [csharp-netcore](https://openapi-generator.tech/docs/generators/csharp/)
* [go](https://openapi-generator.tech/docs/generators/go/)
* [java](https://openapi-generator.tech/docs/generators/java/)
* [kotlin](https://openapi-generator.tech/docs/generators/kotlin/)
* [android](https://openapi-generator.tech/docs/generators/android/)
* [rust](https://openapi-generator.tech/docs/generators/rust/)
* [swift5](https://openapi-generator.tech/docs/generators/swift5/)

**To Explore**

* [typescript-axios](https://openapi-generator.tech/docs/generators/typescript-axios/): Uncessary since we have TRPC
* [zapier](https://openapi-generator.tech/docs/generators/zapier/): Interesting, not included by default in CLI but exists on docs
