"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CodeEditorHtml from "@/components/CodeEditorHtml";
import HtmlPreview from "@/components/HtmlPreview";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import { Card } from "react-bootstrap";

export default function HtmlLevel4() {
  const [code, setCode] = useState(
    "<h2>🤩私の好きなものリスト🤩</h2>\n<ul>\n  <li>カレー🍛</li>\n  <li>犬🐶</li>\n  <li>ゲーム🎮</li>\n</ul>\n\n<h2>🧭 今日やること</h2>\n<ol>\n  <li>ご飯を食べる🍚</li>\n  <li>買い物に行く🛍️</li>\n  <li>寝る😴</li>\n</ol>"
  );
  const { warningMessage } = useSafeHtml(code);

  return (
    <PageLayout>
      <h1 className="text-primary fw-bold mb-3">🧱 HTMLの部屋 - Level 4</h1>
      <p className="text-muted mb-4">
        リストタグを使って、自分の好きなものや冒険の手順を表現してみよう！
        <br />
        <code>&lt;ul&gt;</code>（順不同）と <code>&lt;ol&gt;</code>
        （順序あり）タグを使い分けてね。
      </p>

      <Card className="bg-light border-start border-4 border-success mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-2">
            ✅ <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>,{" "}
            <code>&lt;li&gt;</code> タグってなに？
          </h5>
          <ul>
            <li>
              <code>&lt;ul&gt;</code> は「順不同のリスト」！
            </li>
            <li>
              <code>&lt;ol&gt;</code> は「順序付きのリスト」だよ！
            </li>
            <li>
              <code>&lt;li&gt;</code> はリストの中身を表すタグ！
            </li>
          </ul>
          <div className="mt-3 p-3 bg-white rounded border">
            <h6>好きなものリスト（ul）</h6>
            <ul>
              <li>カレー🍛</li>
              <li>犬🐶</li>
              <li>ゲーム🎮</li>
            </ul>
            <h6 className="mt-3">今日やること（ol）</h6>
            <ol>
              <li>ご飯を食べる🍚</li>
              <li>買い物に行く🛍️</li>
              <li>寝る😴</li>
            </ol>
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
