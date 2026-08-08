"use client";

import { useState } from "react";
import Link from "next/link";
import { queryIndex, type SearchEntry, type SearchResult } from "../lib/search";

export function SearchBox({ index }: { index: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[] | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResults(queryIndex(index, query));
  }

  return (
    <div style={{ flex: 1, maxWidth: 440, position: "relative" }}>
      <form role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          role="searchbox"
          placeholder="Search all docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            height: 32,
            borderRadius: 6,
            border: "1px solid oklch(88% 0.005 260)",
            padding: "0 10px",
            fontSize: 13,
            background: "oklch(97% 0.003 260)",
            outline: "none",
          }}
        />
      </form>
      {results !== null && (
        results.length > 0 ? (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid oklch(88% 0.005 260)",
              borderRadius: 6,
              marginTop: 4,
              padding: 0,
              listStyle: "none",
              zIndex: 100,
              maxHeight: 320,
              overflowY: "auto",
            }}
          >
            {results.map((r, i) => (
              <li key={i} style={{ borderBottom: "1px solid oklch(94% 0.003 260)" }}>
                <Link
                  href={r.href}
                  style={{ display: "block", padding: "8px 12px", textDecoration: "none" }}
                >
                  <span style={{ fontSize: 11, color: "oklch(55% 0.02 260)", marginRight: 8 }}>
                    {r.type}
                  </span>
                  <span style={{ fontWeight: 500, fontSize: 13 }}>{r.title}</span>
                  {r.snippet && (
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "oklch(45% 0.01 260)" }}>
                      {r.snippet}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ position: "absolute", top: "100%", left: 0, fontSize: 13, marginTop: 4, color: "oklch(50% 0.01 260)" }}>
            No results
          </p>
        )
      )}
    </div>
  );
}
