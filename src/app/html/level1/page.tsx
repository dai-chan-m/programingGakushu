"use client";

import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

export default function HtmlLevel1() {
  const [code, setCode] = useState("<p>こんにちは！</p>");
  const [result, setResult] = useState("");

  const containsDangerousHtml = (input: string) => {
    const pattern = /<(script|iframe|object|embed|link|meta)[^>]*>/gi;
    const onEventPattern = /on\w+=/gi;
    const jsProtocolPattern = /javascript:/gi;
    return (
      pattern.test(input) ||
      onEventPattern.test(input) ||
      jsProtocolPattern.test(input)
    );
  };

  const runCheck = () => {
    if (containsDangerousHtml(code)) {
      setResult("🚫 安全のため、一部のタグや属性の使用は禁止されています。");
      return;
    }
    setResult("");
  };

  return (
    <Container className="py-5" style={{ maxWidth: "720px" }}>
      <Card className="shadow border-0 rounded-4">
        <Card.Body className="p-4">
          <h1 className="text-center fw-bold text-primary mb-3">
            🧱 HTMLの部屋 - Level 1
          </h1>
          <p className="text-center text-muted mb-4">
            <code>&lt;p&gt;</code>タグを使って、文字を表示してみよう！
          </p>
          {/* 説明セクション */}
          <div className="p-4 rounded-4 bg-light border-start border-4 border-warning mb-5">
            <h5 className="fw-bold mb-2">
              ✅ <code>&lt;p&gt;</code>タグってなに？
            </h5>
            <ul>
              <li>
                <code>&lt;p&gt;</code>は「段落」を作るタグだよ！
              </li>
              <li>この中に文字を書くと、ブラウザに表示されるんだ！</li>
              <li>
                必ず、<code>&lt;/p&gt;</code>
                のように閉じタグを最後につけるんだよ！
              </li>
              <li>
                たとえば
                <code>&quot;&lt;p&gt;こんにちは！&lt;/p&gt;&quot;</code>
                と書くと…
              </li>
            </ul>
            <div className="border rounded mt-3 bg-white py-2 text-center fw-bold">
              こんにちは！
            </div>
          </div>
          {/* 入力フォーム */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              💡 HTMLコードを書いてみよう！
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              className="font-monospace"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>
          <div className="text-center mb-4">
            <Button
              variant="primary"
              onClick={runCheck}
              className="px-4 py-2 rounded-pill fw-bold"
            >
              ▶ 表示する
            </Button>
          </div>
          {/* プレビューセクション */}
          <h5 className="fw-bold mb-2">🌈 表示結果プレビュー</h5>
          {result ? (
            <Alert variant="danger" className="text-center">
              {result}
            </Alert>
          ) : (
            <div
              className="border rounded p-4 bg-white text-center"
              style={{ minHeight: "60px" }}
              dangerouslySetInnerHTML={{ __html: code }}
            />
          )}
          <div className="text-center mt-5">
            <Button
              href="/html/level2"
              variant="warning"
              className="px-4 py-2 rounded-pill fw-bold text-dark"
            >
              ▶ レベル2へすすむ
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
