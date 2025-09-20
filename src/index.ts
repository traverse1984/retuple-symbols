/**
 * ## Result Like Symbol
 *
 * Implement a custom result-like by implementing {@link ResultLike} on a class
 * or object. An object with this implementation can be converted to a `Result`
 * by the {@link https://www.npmjs.com/package/retuple|retuple} library and can
 * be used in most places where a `Result` is required.
 *
 * ```ts
 * import { ResultLikeSymbol, type ResultLike } from "retuple-symbols";
 *
 * class CustomResult<T> implements ResultLike<T, CustomError> {
 *   value: T;
 *
 *   constructor(value: T) {
 *     this.value = value;
 *   }
 *
 *   [ResultLikeSymbol]() {
 *     return this.value === "test"
 *       ? { ok: true as const, value: this.value }
 *       : { ok: false as const, value: "Value was not test" };
 *   }
 * }
 * ```
 *
 * Then using {@link https://www.npmjs.com/package/retuple|retuple}...
 *
 * import { Result, Ok } from "retuple";
 *
 * ```ts
 * const custom = new CustomResult("test");
 * const result: Result<string, Error> = Result(custom);
 *
 * const chain = Ok("test")
 *  .$andThen((val) => new CustomResult(val))
 *  .$tap((val) => console.log(`Value should be test:`, val))
 *  .$map((val) => "not test")
 *  .$andThen((val) => new CustomResult(val))
 *  .$tapErr((err) => console.log(`Should be error message:`, err))
 *  ...
 * ```
 */
export const ResultLikeSymbol = Symbol("retuple/result-like");

export type ResultLikeSymbol = typeof ResultLikeSymbol;

export type ResultLike<T, E> = {
  [ResultLikeSymbol](): ResultLikeOk<T> | ResultLikeErr<E>;
};

export type ResultLikeOk<T> = { ok: true; value: T };
export type ResultLikeErr<E> = { ok: false; value: E };
