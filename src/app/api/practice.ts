export async function submitPracticePost({
  name,
  title,
  description,
  code,
}: {
  name: string;
  title: string;
  description: string;
  code: string;
}) {
  const res = await fetch("/api/practice/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, title, description, code }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "投稿に失敗しました");
  }

  return await res.json();
}

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export async function fetchPracticePosts() {
  const { data, error } = await supabase
    .from("html_practice_posts")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function likePracticePost(postId: number) {
  const { error } = await supabase.rpc("increment_good_count", {
    post_id: postId,
  });

  if (error) throw new Error(error.message);
}
