"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CodeEditorHtml from "@/components/CodeEditorHtml";
import HtmlPreview from "@/components/HtmlPreview";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import { Card } from "react-bootstrap";

export default function HtmlLevel6() {
  const [code, setCode] = useState(
    '<label for="name">名前を入力してください：</label>\n<input type="text" id="name" name="name" />'
  );
  const { warningMessage } = useSafeHtml(code);

  return (
    <PageLayout>
      <h1 className="text-primary fw-bold mb-3">🧱 HTMLの部屋 - Level 7</h1>
      <p className="text-muted mb-4">
        <code>&lt;input&gt;</code>{" "}
        タグを使って、名前を入力する欄を作ってみよう！
      </p>

      <Card className="bg-light border-start border-4 border-info mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-2">
            ✅ <code>&lt;input&gt;</code> タグってなに？
          </h5>
          <ul>
            <li>ユーザーから情報を入力してもらうためのタグだよ！</li>
            <li>
              <code>type="text"</code> で文字入力用になる！
            </li>
            <li>
              <code>&lt;label&gt;</code> と <code>&lt;input&gt;</code> は
              <strong>id と for</strong> を使って<strong>関連づけ</strong>ると、
              <strong>ラベルをクリックしたときに入力欄が選択</strong>
              されるようになるよ！
            </li>
            <li>
              <code>name="name"</code> もつけることで、
              フォーム送信時に入力内容をサーバー側で識別できるようになるよ！
            </li>
          </ul>
          <div className="mt-3 p-3 bg-white rounded border">
            <label htmlFor="name1">名前を入力してください：</label>
            <input
              type="text"
              id="name1"
              name="name1"
              className="form-control mt-2"
            />
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
        <a href="/html/level8">
          <button className="btn btn-primary fw-bold px-4 py-2 rounded-pill">
            ▶ レベル8へすすむ
          </button>
        </a>
      </div>
    </PageLayout>
  );
}
