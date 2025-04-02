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
import { detectDangerousCode } from "@/utils/sanitizeCode";

export default function Level3() {
  const initialCode = `// healという関数を定義して、"HPが回復した！" と表示しよう`;

  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState("");
  const [cleared, setCleared] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);

  const runCode = () => {
    try {
      const danger = detectDangerousCode(code);
      if (danger) {
        setResult(
          `🚫 ${danger}\n\n【出力結果】\n安全性の問題により実行できませんでした`
        );
        return;
      }
      const logs: string[] = [];

      // チート判定（ユーザーが直接出力してないか）
      const userPrintedDirectly =
        code.includes('console.log("HPが回復した！")') ||
        code.includes("console.log('HPが回復した！')");

      if (userPrintedDirectly) {
        setResult(
          '🚫 "HPが回復した！" を直接出力しないで、関数の中で出力してね！\n\n【出力結果】\n関数を正しく定義してください'
        );
        return;
      }

      const originalLog = console.log;
      console.log = (msg: any) => logs.push(String(msg));

      // heal() を固定で実行
      eval(code + "\nheal();");

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

      const correctMessage = logs.includes("HPが回復した！");

      const usedConsoleLog =
        code.includes('console.log("HPが回復した！")') ||
        code.includes("console.log('HPが回復した！')") ||
        code.includes('" + name') ||
        code.includes("${");

      if (correctMessage) {
        setResult(`✨ 回復魔法が発動した！HPが全快だ！💖\n\n${detailedResult}`);
        setCleared(true);
        setShowExplanation(true);
      } else {
        setResult(
          `🌀 魔力が足りない… heal 関数の中で正しく出力してみよう！\n\n${detailedResult}`
        );
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
      "😢 ギブアップ…でも魔法の書き方は学べたぞ！\n\n【正解例を表示します】"
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-mono bg-[#1a1a1a] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        🧩 Level 3: 回復の呪文
      </h1>
      <p className="mb-4 text-gray-300">
        <code>heal</code> という関数を定義して、
        <code className="ml-1">HPが回復した！</code>{" "}
        というメッセージを表示しよう！
        <br />
        <span className="text-sm text-gray-400">
          ※ <code>heal();</code>{" "}
          は下で自動的に呼び出されるから、関数の定義だけすればOKだよ！
          <br />※ <strong>console.log() を直接使って出力しないように！</strong>
        </span>
      </p>

      <CodeEditor code={code} onChange={setCode} />

      <p className="mt-3 text-sm text-gray-400">
        🧾 以下のコードは固定で実行されます（編集しないでOK！）
      </p>
      <pre className="bg-black text-white p-3 rounded mt-1 border border-gray-700">
        heal();
      </pre>

      <div className="flex flex-row gap-4 my-4 flex-wrap items-start">
        <RunButton onClick={runCode} />
        <HintBox
          hints={[
            "`function heal() { ... }` のように関数を定義しよう！",
            '`console.log("HPが回復した！");` を関数の中に書くことで魔法が発動するよ！',
            "`heal();` は自動的に呼び出されるから、定義だけでOK！",
            "console.log() を関数の外で使うと失格になるよ！",
          ]}
        />
        <GiveUpButton onGiveUp={handleGiveUp} />
      </div>

      <ResultBox result={result} />

      {gaveUp && (
        <GiveUpResult
          answerCode={`function heal() {\n  console.log("HPが回復した！");\n}`}
        />
      )}

      {cleared && (
        <>
          <ClearMessage />
          {showExplanation && (
            <ExplanationBox>
              <p className="mb-1">
                関数 <code>heal</code>{" "}
                を定義して、その中に出力処理を書くことで、
                正しい回復魔法が完成したね！
              </p>
              <p>
                関数の定義と実行を切り分けて考えることが、今後のステップにもつながる重要な力だよ！✨
              </p>
            </ExplanationBox>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/levels/4">
              <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded transition">
                ▶ レベル4へ進む
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
