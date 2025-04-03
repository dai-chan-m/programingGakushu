"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CodeEditorHtml from "@/components/CodeEditorHtml";
import HtmlPreview from "@/components/HtmlPreview";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import { Card } from "react-bootstrap";

export default function HtmlLevel8() {
  const [code, setCode] = useState(
    '<label for="job">あなたの職業を選んでください：</label>\n<select id="job" name="job">\n  <option value="warrior">🗡 戦士</option>\n  <option value="mage">🪄 魔法使い</option>\n  <option value="thief">🗡 盗賊</option>\n</select>'
  );
  const { warningMessage } = useSafeHtml(code);

  return (
    <PageLayout>
      <h1 className="text-primary fw-bold mb-3">🧱 HTMLの部屋 - Level 8</h1>
      <p className="text-muted mb-4">
        <code>&lt;select&gt;</code>{" "}
        タグを使って、プルダウンの選択メニューを作ってみよう。
      </p>

      <Card className="bg-light border-start border-4 border-primary mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-2">
            ✅ <code>&lt;select&gt;</code> と <code>&lt;option&gt;</code>{" "}
            タグってなに？
          </h5>
          <ul>
            <li>
              <code>&lt;select&gt;</code> は選択肢の一覧をまとめるタグ！
            </li>
            <li>
              <code>&lt;option&gt;</code> は選択肢1つずつを表すよ！
            </li>
            <li>
              <code>value</code>{" "}
              属性は、実際にフォームを送信したときに、サーバー側に送られる値を指定するんだ！
              今はまだ送信しないけど、後のステージでこの値が活きてくるよ！
            </li>
          </ul>
          <div className="mt-3 p-3 bg-white rounded border">
            <label htmlFor="job">あなたの職業を選んでください：</label>
            <select id="job" name="job" className="form-select mt-2">
              <option value="warrior">🗡 戦士</option>
              <option value="mage">🪄 魔法使い</option>
              <option value="thief">🗡 盗賊</option>
            </select>
          </div>
        </Card.Body>
      </Card>

      <CodeEditorHtml
        label="💡 HTMLコードを書いてみよう 💪武闘家などを足してみてね"
        value={code}
        onChange={setCode}
      />

      <HtmlPreview html={code} warning={warningMessage} />

      <div className="text-center mt-5">
        <a href="/html/level9">
          <button className="btn btn-primary fw-bold px-4 py-2 rounded-pill">
            ▶ レベル9へすすむ
          </button>
        </a>
      </div>
    </PageLayout>
  );
}
