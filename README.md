<p>
  <a href="https://github.com/traverse1984/retuple-symbols/actions?query=branch%3Adevelopment">
    <img src="https://github.com/traverse1984/retuple-symbols/actions/workflows/test.yml/badge.svg?event=push&branch=main" alt="retuple-symbols test status" />
  </a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow">
    <img src="https://img.shields.io/github/license/traverse1984/retuple-symbols" alt="License">
  </a>
  <a href="https://github.com/traverse1984/retuple-symbols" rel="nofollow">
    <img src="https://img.shields.io/github/stars/traverse1984/retuple-symbols" alt="GitHub stars"></a>
</p>

# Retuple Symbols

Implement a custom result-like by implementing `ResultLike` on a class or object. An object with this implementation can be converted to a `Result` by the [retuple](https://www.npmjs.com/package/retuple) library and can be used in most places where a `Result` is required.

## Creating a custom Result

```ts
import { ResultLikeSymbol, type ResultLike } from "retuple-symbols";

class CustomResult<T> implements ResultLike<T, CustomError> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  [ResultLikeSymbol]() {
    return this.value === "test"
      ? { ok: true as const, value: this.value }
      : { ok: false as const, value: "Value was not test" };
  }
}
```

## Using a custom Result

```ts
import { Result, Ok } from "retuple";

const custom = new CustomResult("test");
const result: Result<string, Error> = Result(custom);

const chain = Ok("test")
 .$andThen((val) => new CustomResult(val))
 .$tap((val) => console.log(`Value should be test:`, val))
 .$map((val) => "not test")
 .$andThen((val) => new CustomResult(val))
 .$tapErr((err) => console.log(`Should be error message:`, err))
 ...
```
