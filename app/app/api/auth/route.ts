import { NextResponse } from "next/server";

type reqData = {
  token: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { token } = data;

  // send auth cookie if user has right credentials
  if (token === "123") {
    const newToken = "1234";
    const response = NextResponse.json({ message: "Authenticated" });
    response.cookies.set({
      name: "auth_token",
      value: newToken,
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // week
      sameSite: "lax",
    });
    return response;
  } else {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
        message: "Invalid or missing authentication token.",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 401,
      }
    );
  }
}
