"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CodeEditorHtml from "@/components/CodeEditorHtml";
import HtmlPreview from "@/components/HtmlPreview";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import { Card } from "react-bootstrap";

export default function HtmlLevel3() {
  const [code, setCode] = useState(
    '<h1>モンスターが出現！</h1>\n\n<img src="/images/ここにmonster1やmonster2と入れてね.png" />'
  );
  const { isSafe, warningMessage } = useSafeHtml(code);

  return (
    <PageLayout>
      <h1 className="text-primary fw-bold mb-3">🧱 HTMLの部屋 - Level 3</h1>
      <p className="text-muted mb-4">
        画像を表示してみよう！<code>&lt;img&gt;</code>{" "}
        タグを使って、かわいいモンスターを呼び出そう！
      </p>

      <Card className="bg-light border-start border-4 border-info mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-2">
            ✅ <code>&lt;img&gt;</code> タグってなに？
          </h5>
          <ul>
            <li>画像を表示するためのタグだよ！</li>
            <li>
              <code>src</code> 属性で、表示したい画像のURLを指定するよ！
            </li>
            <li>
              たとえば <code>&lt;img src="/images/monster.png" /&gt;</code>{" "}
              と書くと…
            </li>
            <li>わあ！！モンスターが出現だ！！！！</li>
          </ul>
          <div className="border rounded mt-3 bg-white py-2 text-center fw-bold">
            <img
              src="/images/monster.png"
              alt="あれれ、画像が見つからないよ。正しくsrcが書けているかな？"
              style={{ borderRadius: "8px" }}
            />
          </div>
        </Card.Body>
      </Card>

      <CodeEditorHtml
        label={`💡 上を参考にして、君もモンスターを呼び出してみてね！monster1.pngと、monster2.pngを用意してあるよ`}
        value={code}
        onChange={setCode}
      />

      <HtmlPreview html={code} warning={warningMessage} />

      <div className="text-center mt-5">
        <a href="/html/level4">
          <button className="btn btn-success fw-bold px-4 py-2 rounded-pill">
            ▶ レベル4へすすむ
          </button>
        </a>
      </div>
    </PageLayout>
  );
}
