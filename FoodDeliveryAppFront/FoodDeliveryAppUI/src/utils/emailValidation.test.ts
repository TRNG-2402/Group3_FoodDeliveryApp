import { describe, expect, it } from "vitest";
import { validateEmail } from "./emailValidation";

describe("validateEmail", () => {
  it("returns a match for a valid email", () => {
    const result = validateEmail("test@example.com");

    expect(result).toBeTruthy();
  });

  it("returns null for an email without @", () => {
    const result = validateEmail("testexample.com");

    expect(result).toBeNull();
  });

  it("returns null for an email without domain", () => {
    const result = validateEmail("test@");

    expect(result).toBeNull();
  });

  it("returns null for an empty email", () => {
    const result = validateEmail("");

    expect(result).toBeNull();
  });

  it("accepts uppercase emails by converting to lowercase", () => {
    const result = validateEmail("TEST@EXAMPLE.COM");

    expect(result).toBeTruthy();
  });
});