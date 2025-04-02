"use client";

import { useState } from "react";
import Link from "next/link";

export default function Level6() {
  const initialCode = `// getSecretという関数を定義して、"open sesame" を返そう

function getSecret() {
  // ここに処理を書く
}`;

  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState("");
  const [cleared, setCleared] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);

  const handleRun = () => {
    try {
      const originalLog = console.log;
      console.log = () => {};

      let secret = "";
      secret = "";
      eval(code + "\nsecret = getSecret();");

      console.log = originalLog;

      if (typeof secret !== "string") {
        setResult("❌ 文字列を返すようにしてね！");
      } else if (secret.trim() === "open sesame") {
        setResult("✨ 扉が開いた…呪文は正しく伝わった！🚪💨");
        setCleared(true);
        setShowExplanation(true);
      } else {
        setResult("🌀 何かが違う…呪文は「open sesame」だったはず…");
      }
    } catch (err) {
      if (err instanceof Error) {
        setResult(`❌ エラー: ${err.message}`);
      }
    }
  };

  const handleGiveUp = () => {
    setGaveUp(true);
    setShowExplanation(true);
    setResult("😢 ギブアップ…でも正解を見て学べば大丈夫！");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-mono text-white bg-[#1a1a1a] min-h-screen">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">
        🧩 Level 6: 秘密のパスワード
      </h1>

      <p className="mb-4 text-gray-300">
        <code>getSecret</code> という関数を定義して、
        <br />
        <strong className="text-green-300">&quot;open sesame&quot;</strong>
        を返すようにしてね！
      </p>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-48 bg-black text-white p-4 rounded border border-gray-600"
      />

      <div className="flex gap-4 my-4 flex-wrap">
        <button
          onClick={handleRun}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
        >
          ▶ 実行
        </button>
        <button
          onClick={handleGiveUp}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
        >
          🌀 ギブアップ
        </button>
        {cleared && (
          <Link href="/levels/7">
            <button className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded">
              ▶ 次のレベルへ
            </button>
          </Link>
        )}
      </div>

      {result && (
        <div className="mt-4 bg-black/40 p-4 rounded border border-gray-700 text-green-300">
          {result}
        </div>
      )}

      {showExplanation && (
        <div className="mt-6 bg-black/40 p-4 rounded border border-purple-500">
          <h2 className="text-xl font-bold text-purple-300 mb-2">💡 解説</h2>
          <p className="text-gray-300">
            関数内で return を使って <code>&quot;open sesame&quot;</code>{" "}
            を返す必要があります。
            <br />
            例：
            <br />
            <code>{`function getSecret() {\n  return "open sesame";\n}`}</code>
          </p>
        </div>
      )}

      {gaveUp && (
        <div className="mt-6 bg-black/40 p-4 rounded border border-red-500">
          <h2 className="text-xl font-bold text-red-400 mb-2">✅ 正解例</h2>
          <pre className="bg-black p-3 rounded border border-gray-700 text-green-200">
            {`function getSecret() {
  return &quot;open sesame&quot;;
}`}
          </pre>
        </div>
      )}
    </div>
  );
}
