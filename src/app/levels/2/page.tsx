"use client";

import { useState } from "react";
import Link from "next/link";
import { CodeEditor } from "@/components/CodeEditor";
import RunButton from "@/components/RunButton";
import ResultBox from "@/components/ResultBox";
import ClearMessage from "@/components/ClearMessage";
import HintBox from "@/components/HintBox";
import ExplanationBox from "@/components/ExplanationBox";
import GiveUpButton from "@/components/GiveUpButton";
import GiveUpResult from "@/components/GiveUpResult";

export default function Level2() {
  const initialCode = `const hasKey = false;\n\nif (hasKey) {\n  console.log("扉が開いた")\n}`;

  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState("");
  const [cleared, setCleared] = useState(false);
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

      if (logs.includes("扉が開いた！")) {
        setResult(`✅ 扉が開いた！\n\n${detailedResult}`);
        setCleared(true);
        setShowExplanation(true);
      } else {
        setResult(`🌀 鍵はあるけど…扉が開かない？\n\n${detailedResult}`);
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
      <h1 className="text-3xl font-bold mb-6 text-yellow-300">
        🧩 Level 2: 鍵と扉
      </h1>
      <p className="mb-4 text-gray-300">
        if文を使って「扉が開いた！」と表示させよう！
      </p>

      <CodeEditor code={code} onChange={setCode} />

      <div className="flex flex-row gap-4 my-4 flex-wrap items-start">
        <RunButton onClick={runCode} />
        <HintBox
          hints={[
            "ifの中に処理を書くと、hasKey が true のときだけ実行されるよ！",
            '出力には console.log("扉が開いた！"); を使おう！',
          ]}
        />
        <GiveUpButton onGiveUp={handleGiveUp} />
      </div>

      <ResultBox result={result} />

      {gaveUp && (
        <GiveUpResult
          answerCode={`const hasKey = true;\n\nif (hasKey) {\n  console.log("扉が開いた！");\n}`}
        />
      )}

      {cleared && (
        <>
          <ClearMessage />
          {showExplanation && (
            <ExplanationBox>
              <p className="mb-1">
                `if (hasKey) {}` の中に `console.log("扉が開いた！");`
                を書くことで、 条件を満たした時だけ処理が実行されます。
              </p>
              <p>
                これは「条件分岐」と呼ばれる基本的なロジックで、
                ゲームやアプリの動きを決めるときに超よく使います！
              </p>
            </ExplanationBox>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/levels/3">
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
