"use client";

import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import HtmlPreview from "@/components/HtmlPreview";

export default function HtmlLevel1() {
  const [code, setCode] = useState("<h1>やったー！</h1>");
  const { warningMessage } = useSafeHtml(code);

  return (
    <Container className="py-5" style={{ maxWidth: "720px" }}>
      <Card className="shadow border-0 rounded-4">
        <Card.Body className="p-4">
          <h1 className="text-center fw-bold text-primary mb-3">
            🧱 HTMLの部屋 - Level 2
          </h1>
          <p className="text-center text-muted mb-4">
            <code>&lt;h1&gt;</code>タグを使って、文字を表示してみよう！
          </p>
          {/* 説明セクション */}
          <div className="p-4 rounded-4 bg-light border-start border-4 border-warning mb-5">
            <h5 className="fw-bold mb-2">
              ✅ <code>&lt;h1&gt;</code>タグってなに？
            </h5>
            <ul>
              <li>
                {" "}
                <code>&lt;h1&gt;</code> は「見出し（Heading）」のタグだよ！
              </li>
              <li>ページの中でいちばん大きくて目立つ文字になるよ！</li>
              <li>
                見出しの重要度に応じて、<code>&lt;h2&gt;</code>、
                <code>&lt;h3&gt;</code>、<code>&lt;h4&gt;</code>、
                <code>&lt;h5&gt;</code>、<code>&lt;h6&gt;</code>
                まで用意されているよ
              </li>
              <li>
                たとえば <code>&lt;h1&gt;やったー！&lt;/h1&gt;</code> と書くと…
              </li>
            </ul>
            <div className="border rounded mt-3 bg-white py-2 text-center fw-bold">
              <h1>やったー！</h1>
            </div>
          </div>
          {/* 入力フォーム */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              💡 HTMLコードを書いてみよう！<code>&lt;h2&gt;</code>や、
              <code>&lt;h3&gt;</code>なども書いてみてね
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              className="font-monospace"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>
          {/* プレビューセクション */}
          <HtmlPreview html={code} warning={warningMessage} />

          <div className="text-center mt-5">
            <Button
              href="/html/level2"
              variant="warning"
              className="px-4 py-2 rounded-pill fw-bold text-dark"
            >
              ▶ レベル3へすすむ
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
