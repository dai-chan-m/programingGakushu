"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import HtmlPreview from "@/components/HtmlPreview";
import { Container, Card, Button, Spinner } from "react-bootstrap";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default function PracticeListPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("html_practice_posts")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // 初期化（localStorage から取得）
  useEffect(() => {
    const stored = localStorage.getItem("liked_posts");
    if (stored) {
      setLikedPosts(JSON.parse(stored));
    }
  }, []);

  // いいね処理
  const handleLike = async (postId: number) => {
    if (likedPosts.includes(String(postId))) return;

    const { error } = await supabase.rpc("increment_good_count", {
      post_id: postId,
    });

    if (!error) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, good_count: post.good_count + 1 }
            : post
        )
      );

      const updated = [...likedPosts, String(postId)];
      setLikedPosts(updated);
      localStorage.setItem("liked_posts", JSON.stringify(updated));
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "1500px" }}>
      <Card className="shadow border-0 rounded-4">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h1 className="fw-bold text-primary">🌍 みんなの投稿一覧</h1>
            <p className="text-muted">公開された練習コードを見て学ぼう！</p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {posts.map((post) => (
                <Card key={post.id} className="p-4 shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0 text-primary">📘 {post.title}</h5>
                    <span className="badge bg-secondary">by {post.name}</span>
                  </div>
                  <p className="text-muted mb-2">📝 {post.description}</p>
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="fw-bold text-muted mt-4">
                        💻 投稿されたコード
                      </h5>
                      <div className="bg-light p-3 border rounded">
                        <pre className="mb-0 text-wrap">
                          <code>{post.code}</code>
                        </pre>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <HtmlPreview html={post.code} />
                    </div>
                  </div>
                  <div className="text-end mt-3">
                    <span className="me-2">❤️ {post.good_count}</span>
                    <Button
                      size="sm"
                      variant={
                        likedPosts.includes(String(post.id))
                          ? "secondary"
                          : "danger"
                      }
                      disabled={likedPosts.includes(String(post.id))}
                      onClick={() => handleLike(post.id)}
                    >
                      {likedPosts.includes(String(post.id))
                        ? "いいねありがとう！"
                        : "いいね"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
