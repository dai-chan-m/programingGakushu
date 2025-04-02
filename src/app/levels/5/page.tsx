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
import { detectDangerousCode } from "@/utils/sanitizeCode";

export default function Level5() {
  const initialCode = `// for文を使って、1から5までの数字を順番に表示しよう
// 「鍵1を見つけた！」「鍵2を見つけた！」...「鍵5を見つけた！」`;

  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState("");
  const [cleared, setCleared] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);

  const runCode = () => {
    try {
      const danger = detectDangerousCode(code);
      if (danger) {
        setResult(`🚫 ${danger}`);
        return;
      }

      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (msg: any) => logs.push(String(msg));
      eval(code);
      console.log = originalLog;

      // 期待する出力をチェック
      const expectedOutputs = [
        "鍵1を見つけた！",
        "鍵2を見つけた！",
        "鍵3を見つけた！",
        "鍵4を見つけた！",
        "鍵5を見つけた！"
      ];

      // 全ての期待する出力が順番通りにあるかチェック
      const allOutputsPresent = expectedOutputs.every((output, index) => 
        logs[index] === output
      );
      
      // for文を使っているかチェック
      const usedForLoop = code.includes("for (") || code.includes("for(");

      // 実行結果の詳細を表示用に加工
      let detailedResult = "";
      if (logs.length > 0) {
        detailedResult = "【出力結果】\n" + logs.map((log, index) => `${index + 1}. ${log}`).join("\n");
      } else {
        detailedResult = "【出力結果】\n何も出力されませんでした";
      }

      if (allOutputsPresent && usedForLoop) {
        setResult(`✨ 全ての鍵を見つけた！隠し扉が開いた！🚪\n\n${detailedResult}`);
        setCleared(true);
        setShowExplanation(true);
      } else if (!usedForLoop) {
        setResult(`🌀 for文を使って繰り返し処理をしよう！\n\n${detailedResult}`);
      } else {
        setResult(`🌀 まだすべての鍵を見つけられていないようだ…\n\n${detailedResult}`);
      }
    } catch (err: any) {
      setResult(`❌ エラー: ${err.message}\n\n【出力結果】\nエラーが発生したため実行できませんでした`);
    }
  };

  const handleGiveUp = () => {
    setGaveUp(true);
    setShowExplanation(true);
    setResult("😢 ギブアップ…でも繰り返しの魔法は学べたぞ！\n\n【正解例を表示します】");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-mono bg-[#1a1a1a] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">
        🧩 Level 5: 鍵を探せ！
      </h1>
      <p className="mb-4 text-gray-300">
        <strong>for文</strong>を使って、1から5までの数字を順番に表示しよう！
        <br />
        <span className="text-sm text-gray-400">
          ※ 「鍵1を見つけた！」「鍵2を見つけた！」…と<strong>5つの鍵</strong>を見つけ出そう！
        </span>
      </p>

      <CodeEditor code={code} onChange={setCode} />

      <div className="flex flex-row gap-4 my-4 flex-wrap items-start">
        <RunButton onClick={runCode} />
        <HintBox
          hints={[
            "`for (let i = 1; i <= 5; i++) { ... }` で1から5までの繰り返しができるよ！",
            '`console.log("鍵" + i + "を見つけた！");` のように変数 i を使ってメッセージを作ろう！',
            "for文の3つの部分はそれぞれ「初期値設定」「継続条件」「更新処理」だよ！",
            "テンプレートリテラルを使うと `console.log(`鍵${i}を見つけた！`);` と書けるよ！",
          ]}
        />
        <GiveUpButton onGiveUp={handleGiveUp} />
      </div>

      <ResultBox result={result} />

      {gaveUp && (
        <GiveUpResult
          answerCode={`for (let i = 1; i <= 5; i++) {\n  console.log("鍵" + i + "を見つけた！");\n}`}
        />
      )}

      {cleared && (
        <>
          <ClearMessage />
          {showExplanation && (
            <ExplanationBox>
              <p className="mb-1">
                <code>for</code>文を使うことで、同じような処理を繰り返し実行できるようになりました！
              </p>
              <p>
                繰り返し処理は、データの一覧処理や、同じパターンの処理を複数回行う時に
                とても便利な機能です。プログラミングの基本中の基本ですね！
              </p>
            </ExplanationBox>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded transition">
                ▶ ホームに戻る
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