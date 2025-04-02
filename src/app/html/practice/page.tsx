"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Form, Button, Alert, Card, Modal } from "react-bootstrap";
import HtmlPreview from "@/components/HtmlPreview";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import { submitPracticePost } from "@/app/api/practice";
import Link from "next/link";

export default function PracticePostPage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("<p>こんにちは！</p>");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const { warningMessage } = useSafeHtml(code);

  const handleSubmit = async () => {
    setSubmitted(false);
    setError("");

    if (!name || !title || !code) {
      setError("すべての項目を入力してください");
      return;
    }

    try {
      await submitPracticePost({ name, title, description, code });
      setSubmitted(true);
      setName("");
      setTitle("");
      setDescription("");
      setCode("<p>こんにちは！</p>");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setShowConfirm(true);
          }}
        >
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

      <HtmlPreview html={code} warning={warningMessage} />

      {submitted && (
        <div className="text-center mt-4">
          <Alert variant="info">
            ✅ 投稿を受け付けました！内容を確認後、公開されます。
          </Alert>
          <Link href="/practice/list" passHref legacyBehavior>
            <a className="btn btn-lg btn-outline-primary rounded-pill fw-bold shadow-sm px-4 py-2">
              🌟 みんなの投稿を見る
            </a>
          </Link>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center mt-4">
          ❌ {error}
        </Alert>
      )}

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>📤 投稿の確認</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          この内容で投稿しますか？投稿後の内容は変更できません。
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            キャンセル
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowConfirm(false);
              handleSubmit();
            }}
          >
            投稿する
          </Button>
        </Modal.Footer>
      </Modal>
    </PageLayout>
  );
}
