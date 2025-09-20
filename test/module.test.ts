import { describe, it, expect } from "vitest";

import * as rts from "../src/index.js";

describe("Module", () => {
  it("should not have a default export", () => {
    expect(rts).not.toHaveProperty("default");
  });

  it("should export the ResultLikeSymbol symbol", () => {
    expect(rts.ResultLikeSymbol).toBeTypeOf("symbol");
  });
});
