export async function POST(): Promise<Response> {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie":
        "admin_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0",
    },
  });
}
