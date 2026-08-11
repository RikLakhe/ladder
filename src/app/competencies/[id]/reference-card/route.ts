import { NextResponse } from "next/server";
import { getReferenceCardRows } from "../../../../lib/reference-card";
import type { RefCardRow } from "../../../../lib/reference-card";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";

const PAGE_SIZE = 20;

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderRows(rows: RefCardRow[]): string {
  return rows
    .map(
      (row) =>
        `<tr><td>${esc(row.badgeCode)}</td><td>${esc(row.badgeName)}</td><td>${esc(row.trainingUnitName)}</td><td>${esc(row.instrumentName)}</td></tr>`
    )
    .join("");
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(req.url);
  const level = url.searchParams.get("level") ?? "P3";
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);

  const allRows = await getReferenceCardRows(DATABASE_URL, id, level);
  const start = (page - 1) * PAGE_SIZE;
  const pageRows = allRows.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(allRows.length / PAGE_SIZE);
  const displayStart = allRows.length === 0 ? 0 : start + 1;
  const displayEnd = Math.min(page * PAGE_SIZE, allRows.length);
  const basePath = `/competencies/${id}/reference-card?level=${level}`;

  const prevLink =
    page > 1
      ? `<a href="${basePath}&page=${page - 1}">Previous</a>`
      : `<a aria-disabled="true">Previous</a>`;
  const nextLink =
    page < totalPages
      ? `<a href="${basePath}&page=${page + 1}">Next</a>`
      : `<a aria-disabled="true">Next</a>`;

  const html = `<!DOCTYPE html>
<html>
<head><title>Reference Card</title></head>
<body>
<main>
<h1>Reference Card</h1>
<p>Showing ${displayStart}&ndash;${displayEnd} of ${allRows.length}</p>
<table>
<thead><tr><th>Badge</th><th>Badge Name</th><th>Training Unit</th><th>Instrument</th></tr></thead>
<tbody>${renderRows(pageRows)}</tbody>
</table>
${totalPages > 1 ? `<div>${prevLink}${nextLink}</div>` : ""}
</main>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
