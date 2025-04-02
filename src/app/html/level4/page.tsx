"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { CodeEditorHtml } from "@/components/CodeEditor";
import HtmlPreview from "@/components/HtmlPreview";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import { Card } from "react-bootstrap";

export default function HtmlLevel4() {
  const [code, setCode] = useState(
    "<h2>🤩私の好きなものリスト🤩</h2>\n<ul>\n<li></li>\n</ul>"
  );
  const { isSafe, warningMessage } = useSafeHtml(code);

  return (
    <PageLayout>
      <h1 className="text-primary fw-bold mb-3">🧱 HTMLの部屋 - Level 4</h1>
      <p className="text-muted mb-4">
        好きなものをリストにしてみよう！<code>&lt;ul&gt;</code>と
        <code>&lt;li&gt;</code>
        タグを使って、好きなものを書き出してみよう！
      </p>

      <Card className="bg-light border-start border-4 border-success mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-2">
            ✅ <code>&lt;ul&gt;</code> と <code>&lt;li&gt;</code> タグってなに？
          </h5>
          <ul>
            <li>
              <code>&lt;ul&gt;</code> は「リストのはじまり」！
            </li>
            <li>
              <code>&lt;li&gt;</code> は「リストの中身」だよ！
            </li>
            <li>リストは「・」マーク付きで並ぶよ！</li>
          </ul>
          <div className="mt-3 p-3 bg-white rounded border">
            <ul>
              <li>カレー🍛</li>
              <li>犬🐶</li>
              <li>ゲーム🎮</li>
            </ul>
          </div>
        </Card.Body>
      </Card>

      <CodeEditorHtml
        label="💡 HTMLコードを書いてみよう"
        value={code}
        onChange={setCode}
      />

      <HtmlPreview html={code} warning={warningMessage} />

      <div className="text-center mt-5">
        <a href="/html/level5">
          <button className="btn btn-success fw-bold px-4 py-2 rounded-pill">
            ▶ レベル5へすすむ
          </button>
        </a>
      </div>
    </PageLayout>
  );
}
