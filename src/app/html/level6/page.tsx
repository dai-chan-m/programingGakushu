"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CodeEditorHtml from "@/components/CodeEditorHtml";
import HtmlPreview from "@/components/HtmlPreview";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import { Card } from "react-bootstrap";

export default function HtmlLevel6() {
  const [code, setCode] = useState(
    '<p>あなたの好きな動物を選んでください：</p>\n<input type="radio" id="dog" name="animal" value="dog">\n<label for="dog">いぬ🐶</label><br>\n<input type="radio" id="cat" name="animal" value="cat">\n<label for="cat">ねこ😺</label><br>\n<input type="radio" id="mouse" name="animal" value="mouse">\n<label for="mouse">ねずみ🐭</label>'
  );
  const { warningMessage } = useSafeHtml(code);

  return (
    <PageLayout>
      <h1 className="text-primary fw-bold mb-3">🧱 HTMLの部屋 - Level 6</h1>
      <p className="text-muted mb-4">
        <code>&lt;input type="radio"&gt;</code> を使って、選択肢を作ってみよう！
      </p>

      <Card className="bg-light border-start border-4 border-info mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-2">✅ ラジオボタンってなに？</h5>
          <ul>
            <li>複数の選択肢の中から1つだけを選ぶ時に使うよ！</li>
            <li>
              <code>type="radio"</code> を指定して、 複数の{" "}
              <code>&lt;input&gt;</code> に同じ <code>name</code> をつけよう！
            </li>
            <li>
              <code>&lt;label&gt;</code> を使えば、クリックしやすくなる！
            </li>
          </ul>
          <div className="mt-3 p-3 bg-white rounded border">
            <p>あなたの好きな動物を選んでください：</p>
            <input type="radio" id="dog1" name="animal1" value="dog" />
            <label htmlFor="dog1"> いぬ 🐶</label>
            <br />
            <input type="radio" id="cat1" name="animal1" value="cat" />
            <label htmlFor="cat1"> ねこ 😺</label>
            <br />
            <input type="radio" id="mouse1" name="animal1" value="mouse" />
            <label htmlFor="mouse1"> ねずみ 🐭</label>
          </div>
        </Card.Body>
      </Card>

      <CodeEditorHtml
        label="💡 HTMLコードを書いてみよう 🐓動物の選択肢を増やしてみてね　※ちなみに&lt;br&gt;と書くと、改行できるよ！！"
        value={code}
        onChange={setCode}
      />

      <HtmlPreview html={code} warning={warningMessage} />

      <div className="text-center mt-5">
        <a href="/html/level7">
          <button className="btn btn-primary fw-bold px-4 py-2 rounded-pill">
            ▶ レベル7へすすむ
          </button>
        </a>
      </div>
    </PageLayout>
  );
}
