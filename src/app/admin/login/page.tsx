"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: fd.get("username"),
        password: fd.get("password"),
      }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials.");
    }
  }

  return (
    <main style={{ padding: 32, maxWidth: 400 }}>
      <h1>Admin login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="username">Username</label>
          <br />
          <input id="username" name="username" type="text" autoComplete="username" />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="password">Password</label>
          <br />
          <input id="password" name="password" type="password" autoComplete="current-password" />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
