"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Form, Button, Alert, Card } from "react-bootstrap";
import HtmlPreview from "@/components/HtmlPreview";
import { useSafeHtml } from "@/hooks/useSafeHtml";

export default function PracticePostPage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { warningMessage } = useSafeHtml(code);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !title || !code) return;

    setSubmitted(true);
    // TODO: 実際のDB登録処理
  };

  return (
    <PageLayout>
      <div className="text-center mb-5">
        <h1 className="fw-bold text-danger mb-2">
          🎨 練習コードを投稿しよう！
        </h1>
        <p className="text-muted">みんなとシェアしてレベルアップしよう！</p>
      </div>

      <Card className="p-4 shadow border-3 border-info bg-light">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-primary">
              🧑 ニックネーム
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：ひよこハッカー"
              className="rounded-pill px-3"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-success">
              📘 タイトル
            </Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：はじめてのpタグ"
              className="rounded-pill px-3"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-warning">📝 説明</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="どんな内容かかんたんに教えてね！"
              className="rounded"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-secondary">
              💻 コード
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              className="font-monospace rounded bg-white"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="例：<p>こんにちは！</p>"
            />
            <HtmlPreview html={code} warning={warningMessage} />
          </Form.Group>

          <div className="text-center">
            <Button
              type="submit"
              variant="warning"
              className="fw-bold px-4 py-2 rounded-pill shadow"
            >
              🚀 投稿する
            </Button>
          </div>
        </Form>
      </Card>

      {submitted && (
        <Alert variant="info" className="text-center mt-4">
          ✅ 投稿を受け付けました！内容を確認後、公開されます。
        </Alert>
      )}
    </PageLayout>
  );
}
