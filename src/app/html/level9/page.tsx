"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CodeEditorHtml from "@/components/CodeEditorHtml";
import HtmlPreview from "@/components/HtmlPreview";
import { useSafeHtml } from "@/hooks/useSafeHtml";
import { Card } from "react-bootstrap";

export default function HtmlLevel9() {
  const [code, setCode] = useState(
    '<form>\n  <label for="name">名前：</label><br>\n  <input type="text" id="name" name="name" placeholder="名前を入力"><br><br>\n\n  <label for="job">職業：</label><br>\n  <select id="job" name="job">\n    <option value="warrior">戦士</option>\n    <option value="mage">魔法使い</option>\n    <option value="thief">盗賊</option>\n  </select><br><br>\n\n  <label>属性：</label><br>\n  <input type="radio" id="fire" name="element" value="fire">\n  <label for="fire">火</label>\n  <input type="radio" id="water" name="element" value="water">\n  <label for="water">水</label>\n  <input type="radio" id="wind" name="element" value="wind">\n  <label for="wind">風</label><br><br>\n\n  <button type="submit">送信</button>\n</form>'
  );
  const { warningMessage } = useSafeHtml(code);

  return (
    <PageLayout>
      <h1 className="text-primary fw-bold mb-3">🧱 HTMLの部屋 - Level 9</h1>
      <p className="text-muted mb-4">
        入力フォームの集大成！これまで学んだ要素を組み合わせて、自分のキャラ設定フォームを作ってみよう。
      </p>

      <Card className="bg-light border-start border-4 border-success mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-2">✅ ここまでの復習！</h5>
          <ul>
            <li>
              <code>&lt;input type=&quot;text&quot;&gt;</code> で名前を入力！
            </li>
            <li>
              <code>&lt;select&gt;</code> と <code>&lt;option&gt;</code>
              で職業選択！
            </li>
            <li>
              <code>&lt;input type=&quot;radio&quot;&gt;</code> で属性を選択！
            </li>
            <li>
              <code>&lt;form&gt;</code> で全体をまとめて送信ボタン付き！
            </li>
            <li>
              <code>&lt;button&gt;</code> タグは「ボタン」を作るタグで、
              <code>type=&quot;submit&quot;</code>
              をつけるとフォームを送信する役割になるよ！
            </li>
          </ul>
          <div className="mt-3 p-3 bg-white rounded border">
            <form>
              <label htmlFor="name">名前：</label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="名前を入力"
              />
              <br />
              <br />

              <label htmlFor="job">職業：</label>
              <br />
              <select id="job" name="job">
                <option value="warrior">戦士</option>
                <option value="mage">魔法使い</option>
                <option value="thief">盗賊</option>
              </select>
              <br />
              <br />

              <label>属性：</label>
              <br />
              <input type="radio" id="fire" name="element" value="fire" />
              <label htmlFor="fire">火</label>
              <input type="radio" id="water" name="element" value="water" />
              <label htmlFor="water">水</label>
              <input type="radio" id="wind" name="element" value="wind" />
              <label htmlFor="wind">風</label>
              <br />
              <br />

              <button type="submit">送信</button>
            </form>
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
        <a href="/html/level10">
          <button className="btn btn-success fw-bold px-4 py-2 rounded-pill">
            ▶ レベル10へすすむ
          </button>
        </a>
      </div>
    </PageLayout>
  );
}
