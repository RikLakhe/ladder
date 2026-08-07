export async function POST(req: Request): Promise<Response> {
  const body = await req.json().catch(() => ({}));
  const { username, password } = body as { username?: string; password?: string };

  if (username !== "system" || password !== "TEST@123") {
    return new Response(JSON.stringify({ error: "Invalid credentials." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "admin_session=system; HttpOnly; Path=/; SameSite=Lax",
    },
  });
}
