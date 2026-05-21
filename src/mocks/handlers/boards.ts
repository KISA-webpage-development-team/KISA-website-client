import { http, HttpResponse } from "msw";
import { BoardType } from "@/types/board";
import {
  mockBoardAnnouncements,
  mockBoardPosts,
} from "../fixtures/boards";

const KNOWN_BOARDS = new Set<string>(Object.values(BoardType));

function isKnownBoard(value: string): value is BoardType {
  return KNOWN_BOARDS.has(value);
}

export const boardsHandlers = [
  http.get("*/boards/:boardType/posts/", ({ request, params }) => {
    const boardType = String(params.boardType);
    if (!isKnownBoard(boardType)) {
      return HttpResponse.json({ results: [] });
    }
    const url = new URL(request.url);
    const size = Number(url.searchParams.get("size") ?? 10) || 10;
    const page = Number(url.searchParams.get("page") ?? 0) || 0;
    const offset = page * size;
    const all = mockBoardPosts[boardType];
    return HttpResponse.json({
      results: all.slice(offset, offset + size),
    });
  }),

  http.get("*/boards/:boardType/announcements/", ({ params }) => {
    const boardType = String(params.boardType);
    if (!isKnownBoard(boardType)) {
      return HttpResponse.json({ results: [] });
    }
    return HttpResponse.json({
      results: mockBoardAnnouncements[boardType],
    });
  }),

  http.get("*/boards/:boardType/count/", ({ params }) => {
    const boardType = String(params.boardType);
    if (!isKnownBoard(boardType)) {
      return HttpResponse.json({ postCount: 0 });
    }
    return HttpResponse.json({
      postCount: mockBoardPosts[boardType].length,
    });
  }),
];
