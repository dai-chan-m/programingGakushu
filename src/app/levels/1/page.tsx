"use client";

import { useState } from "react";
import Link from "next/link";
import CodeEditor from "@/components/CodeEditor";
import RunButton from "@/components/RunButton";
import ResultBox from "@/components/ResultBox";
import ClearMessage from "@/components/ClearMessage";
import HintBox from "@/components/HintBox";
import ExplanationBox from "@/components/ExplanationBox";
import GiveUpButton from "@/components/GiveUpButton";
import GiveUpResult from "@/components/GiveUpResult";

export default function Level1() {
  const initialCode = `const message = "Help! I'm stuck!";\nconsole.log(mesage);`;

  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState("");
  const [cleared, setCleared] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);

  const runCode = () => {
    try {
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (msg: any) => logs.push(String(msg));
      eval(code);
      console.log = originalLog;

      // 実行結果の詳細を表示用に加工
      let detailedResult = "";
      if (logs.length > 0) {
        detailedResult =
          "【出力結果】\n" +
          logs.map((log, index) => `${index + 1}. ${log}`).join("\n");
      } else {
        detailedResult = "【出力結果】\n何も出力されませんでした";
      }

      if (logs.includes("Help! I'm stuck!")) {
        setResult(`✅ 正解！扉が開いた…ゴゴゴ…🚪✨\n\n${detailedResult}`);
        setCleared(true);
        setShowExplanation(true);
      } else {
        setResult(`🌀 うーん…まだ何かが違うみたいだ\n\n${detailedResult}`);
      }
    } catch (err: any) {
      setResult(
        `❌ エラー: ${err.message}\n\n【出力結果】\nエラーが発生したため実行できませんでした`
      );
    }
  };

  const handleGiveUp = () => {
    setGaveUp(true);
    setShowExplanation(true);
    setResult(
      "😢 ギブアップ…でも答えを見て学べるぞ！\n\n【正解例を表示します】"
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-mono bg-[#1a1a1a] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        🧩 Level 1: 密室のはじまり
      </h1>
      <p className="mb-4 text-gray-300">コードを修正して脱出しよう！</p>

      <CodeEditor code={code} onChange={setCode} />

      <div className="flex flex-row gap-4 my-4 flex-wrap items-start">
        <RunButton onClick={runCode} />
        <HintBox
          hints={[
            "「変数名」をよ〜く見てみよう。スペルミスかも…？",
            "`console.log()` は、JavaScriptで「デバッグ」や「確認」に使われるコマンドだよ。",
            "指定した値やメッセージを、ブラウザの開発者ツール（コンソール）に表示するためのものなんだ！",
            "ただし、`console.log(mesage);` のように間違った変数名を渡すと、JavaScriptは「そんな変数知らないよ！」と怒ってエラーになるよ。",
            "`console.log(message);` のように、定義されている変数を正しく使おう！",
          ]}
        />
        <GiveUpButton onGiveUp={handleGiveUp} />
      </div>

      <ResultBox result={result} />

      {gaveUp && (
        <GiveUpResult
          answerCode={`const message = "Help! I'm stuck!";\nconsole.log(message);`}
        />
      )}

      {cleared && (
        <>
          <ClearMessage />
          {showExplanation && (
            <ExplanationBox>
              <p className="mb-1">
                `console.log(mesage);`
                は、定義されていない変数を参照しているため、実行時エラーになります。
              </p>
              <p>
                正しくは `message` という変数を使い、
                <code>console.log(message);</code> と書きましょう。
              </p>
            </ExplanationBox>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/levels/2">
              <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded transition">
                ▶ 次のレベルへ進む
              </button>
            </Link>
            <button
              onClick={() => {
                setCode(initialCode);
                setResult("");
                setCleared(false);
                setShowExplanation(false);
                setGaveUp(false);
              }}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded transition"
            >
              🔄 もう一度挑戦！
            </button>
          </div>
        </>
      )}
    </div>
  );
}
