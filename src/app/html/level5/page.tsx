"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CodeEditorHtml from "@/components/CodeEditorHtml";
import HtmlPreview from "@/components/HtmlPreview";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import { Card } from "react-bootstrap";

export default function HtmlLevel5() {
  const [code, setCode] = useState("<a>宝の地図を見る</a>");
  const { warningMessage } = useSafeHtml(code);

  return (
    <PageLayout>
      <h1 className="text-primary fw-bold mb-3">🧱 HTMLの部屋 - Level 5</h1>
      <p className="text-muted mb-4">
        ついに宝の地図を発見…！？<code>&lt;a&gt;</code>
        タグを使って、リンクを作ってみよう！
      </p>

      <Card className="bg-light border-start border-4 border-warning mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-2">
            ✅ <code>&lt;a&gt;</code> タグってなに？
          </h5>
          <ul>
            <li>
              <code>&lt;a&gt;</code> はリンクを作るタグだよ！
            </li>
            <li>
              <code>href</code> 属性に移動先のURLを書くよ！
            </li>
            <li>
              たとえば
              <code>
                &lt;a href=&quot;/html/level4&quot;&gt;レベル４に戻る&lt;/a&gt;
              </code>
              と書くとレベル４に戻るリンクができるよ！（ちゃんとここ、レベル５に戻ってきてね💦）
            </li>
          </ul>
          <div className="mt-3 p-3 bg-white rounded border text-center">
            <a href="/html/level4">レベル４に戻る</a>
          </div>
        </Card.Body>
      </Card>

      <CodeEditorHtml
        label='💡 HTMLコードを書いてみよう &lt;a href=&quot;/html/treasure&quot;&gt; と書いてみると...???'
        value={code}
        onChange={setCode}
      />

      <HtmlPreview html={code} warning={warningMessage} />

      <div className="text-center mt-5">
        <a href="/html/level6">
          <button className="btn btn-success fw-bold px-4 py-2 rounded-pill">
            ▶ レベル6へすすむ
          </button>
        </a>
      </div>
    </PageLayout>
  );
}
