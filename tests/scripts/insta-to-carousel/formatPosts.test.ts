import assert from "assert";
import { extractEventDateLocal, extractSummaryLocal, formatNodeToCarouselItem } from "../../../scripts/insta-to-carousel/formatPosts.ts";

// Simple unit tests that can be run with `node -r ts-node/register tests/scripts/insta-to-carousel/formatPosts.test.ts`

function isoDate(d: string) {
  return new Date(d).toISOString();
}

async function run() {
  // Test 1: ISO date extraction
  const iso = extractEventDateLocal("Event on 2025-01-03 at 6pm. Join us!");
  assert(iso && iso.startsWith("2025-01-03"), `Expected 2025-01-03, got ${iso}`);
  console.log("Test 1 passed — ISO date extraction");

  // Test 2: MM/DD extraction without year -> assumes this year (or next if past far)
  const now = new Date();
  const month = (now.getUTCMonth() + 1).toString();
  const day = now.getUTCDate().toString();
  const md = extractEventDateLocal(`Party on ${month}/${day}`);
  assert(md, `Expected a date for ${month}/${day}`);
  console.log(`Test 2 passed — MM/DD extraction for ${month}/${day}`);

  // Test 3: Month name extraction
  const jan3 = extractEventDateLocal("Join us Jan 3 for the kickoff!");
  assert(jan3 && jan3.includes("01-03"), `Expected Jan 3, got ${jan3}`);
  console.log("Test 3 passed — Month name extraction (Jan 3)");

  // Test 4: summary extraction local
  const s = extractSummaryLocal("Hello world! This is a longer caption. Extra info.", 2);
  assert(s.title.startsWith("Hello world"), `Title unexpected: ${s.title}`);
  console.log("Test 4.1 passed — title extraction from summary");
  assert(s.summary.split(/[.!?]/).length >= 2, `Summary unexpected: ${s.summary}`);
  console.log("Test 4.2 passed — summary sentence extraction");

  // Test 5: formatNodeToCarouselItem integrates eventTakenAt
  const node = {
    id: "123",
    code: "AbCdEf",
    caption: { text: "Event happening Jan 3rd, don't miss it!" },
    image_versions2: { candidates: [{ url: "https://example.com/img.jpg", width: 1080 }] },
  } as any;

  const item = await formatNodeToCarouselItem(node, { useGemini: false });
  assert(item.eventTakenAt, `Expected eventTakenAt to be set, got ${item.eventTakenAt}`);
  console.log("Test 5.1 passed — eventTakenAt extracted in formatNodeToCarouselItem");
  assert(item.title, "Expected title to be set");
  console.log("Test 5.2 passed — title generated in formatNodeToCarouselItem");

  console.log("All tests passed ✨");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
