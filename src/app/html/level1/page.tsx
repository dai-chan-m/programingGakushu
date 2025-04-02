"use client";

import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import PageLayout from "@/components/PageLayout";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import HtmlPreview from "@/components/HtmlPreview";

export default function HtmlLevel1() {
  const [code, setCode] = useState("<p>こんにちは！</p>");
  const { warningMessage } = useSafeHtml(code);

  return (
    <PageLayout>
      <h1 className="text-center fw-bold text-primary mb-3">
        🧱 HTMLの部屋 - Level 1
      </h1>
      <p className="text-center text-muted mb-4">
        <code>&lt;p&gt;</code>タグを使って、文字を表示してみよう！
      </p>
      {/* 説明セクション */}
      <Card className="bg-light border-start border-4 border-info mb-4">
        <Card.Body>
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
        </Card.Body>
      </Card>
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

      {/* プレビューセクション */}
      <HtmlPreview html={code} warning={warningMessage} />

      <div className="text-center mt-5">
        <Button
          href="/html/level2"
          variant="warning"
          className="px-4 py-2 rounded-pill fw-bold text-dark"
        >
          ▶ レベル2へすすむ
        </Button>
      </div>
    </PageLayout>
  );
}
