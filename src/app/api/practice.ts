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
