import { describe, it, expect } from "vitest";
import { notesModuleReady } from "./notes";

describe("notes module", () => {
  it("loads", () => {
    expect(notesModuleReady).toBe(true);
  });
});
