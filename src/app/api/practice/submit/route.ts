// app/api/practice/submit/route.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, title, description, code } = body;

  if (!name || !title || !code) {
    return new Response(JSON.stringify({ error: "必須項目が未入力です" }), {
      status: 400,
    });
  }
  console.log("Received data:", { name, title, description, code });

  const { error } = await supabase.from("html_practice_posts").insert([
    {
      name,
      title,
      description,
      code,
      is_public: false,
      good_count: 0,
    },
  ]);

  if (error) {
    console.error("[Insert Error]", error);
    return new Response(
      JSON.stringify({
        error: error.message ?? "不明なエラー",
        details: error.details ?? "",
        hint: error.hint ?? "",
      }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
