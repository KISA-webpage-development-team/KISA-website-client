import { describe, expect, it } from "vitest";
import { sanitizeCarouselHtml } from "@/lib/dompurify/sanitizeCarouselHtml";

describe("sanitizeCarouselHtml", () => {
  it("keeps the formatting the carousel editor produces", () => {
    const html =
      "<p>Come <strong>meet</strong> <em>us</em> <u>now</u></p><p><br></p><p>line</p>";
    expect(sanitizeCarouselHtml(html)).toBe(html);
  });

  it("removes scripts and event handlers", () => {
    expect(
      sanitizeCarouselHtml('<p>hi<script>alert(1)</script><img src=x onerror="alert(1)"></p>'),
    ).toBe("<p>hi</p>");
  });

  it("drops every attribute, including on allowed tags", () => {
    expect(
      sanitizeCarouselHtml('<p class="ql-align-center" style="color:red">hi</p>'),
    ).toBe("<p>hi</p>");
  });

  it("unwraps tags outside the allowlist but keeps their text", () => {
    expect(
      sanitizeCarouselHtml('<h1>Title</h1><p><a href="https://x.com">link</a></p>'),
    ).toBe("Title<p>link</p>");
  });
});
