import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { clean } from "./clean.ts";

describe("clean", () => {
  it("returns plain text unchanged", () => {
    assert.equal(clean("hello world"), "hello world");
  });

  it("trims whitespace", () => {
    assert.equal(clean("  hello world  "), "hello world");
  });

  it("strips code block markers", () => {
    assert.equal(clean("```\nhello world\n```"), "hello world");
  });

  it("strips code block with language tag", () => {
    assert.equal(clean("```text\nhello world\n```"), "hello world");
  });

  it("strips surrounding double quotes", () => {
    assert.equal(clean('"hello world"'), "hello world");
  });

  it("strips surrounding single quotes", () => {
    assert.equal(clean("'hello world'"), "hello world");
  });

  it("strips code blocks and quotes together", () => {
    assert.equal(clean('```\n"hello world"\n```'), "hello world");
  });

  it("preserves internal quotes", () => {
    assert.equal(clean('say "hello" to the world'), 'say "hello" to the world');
  });

  it("does not strip mismatched quotes", () => {
    assert.equal(clean("\"hello world'"), "\"hello world'");
  });

  it("handles empty string", () => {
    assert.equal(clean(""), "");
  });

  it("handles whitespace-only string", () => {
    assert.equal(clean("   "), "");
  });

  it("preserves multiline content inside code fences", () => {
    assert.equal(clean("```\nline one\nline two\n```"), "line one\nline two");
  });

  it("does not strip single backticks", () => {
    assert.equal(clean("`hello`"), "`hello`");
  });
});
