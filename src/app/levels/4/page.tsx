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

export default function Level4() {
  const initialCode = `// greetという関数を定義して、&quot;こんにちは、ナナミ！&quot; と表示しよう
// name はすでに定義されています。greet(name) も呼ばれています。`;

  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState("");
  const [cleared, setCleared] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);

  const runCode = () => {
    try {
      const logs: string[] = [];

      const originalLog = console.log;
      console.log = (msg: string) => logs.push(String(msg));

      // 固定スクリプトを実行時に追加
      const fixedCall = `\nconst name = &quot;ナナミ&quot;;\ngreet(name);`;
      eval(code + fixedCall);

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

      const correctMessage = logs.includes("こんにちは、ナナミ！");

      const usedNameInOutput =
        code.includes("console.log(name)") ||
        code.includes("&quot; + name") ||
        code.includes("name + &quot;") ||
        code.includes("${name}");

      if (correctMessage && usedNameInOutput) {
        setResult(
          `✨ あいさつの魔法が届いた！扉が開いた！🚪\n\n${detailedResult}`
        );
        setCleared(true);
        setShowExplanation(true);
      } else if (correctMessage && !usedNameInOutput) {
        setResult(
          `⚠️ 出力は合ってるけど、引数 name をちゃんと使ってるかな？\n\n${detailedResult}`
        );
      } else {
        setResult(
          `🌀 扉は沈黙したままだ…。あいさつが違う or 関数が正しくないかも？\n\n${detailedResult}`
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        setResult(
          `❌ エラー: ${err.message}\n\n【出力結果】\nエラーが発生したため実行できませんでした`
        );
      }
    }
  };

  const handleGiveUp = () => {
    setGaveUp(true);
    setShowExplanation(true);
    setResult(
      "😢 ギブアップ…でも正しい呪文は学べたぞ！\n\n【正解例を表示します】"
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-mono bg-[#1a1a1a] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-pink-400">
        🧩 Level 4: あいさつの呪文
      </h1>
      <p className="mb-4 text-gray-300">
        <strong>greet</strong> という関数を定義して、
        <code className="ml-1">こんにちは、ナナミ！</code>
        というメッセージを表示しよう！
        <br />
        <span className="text-sm text-gray-400">
          ※ <code>const name = &quot;ナナミ&quot;;</code> と
          <code>greet(name);</code>
          はすでに用意されています。
        </span>
      </p>

      <CodeEditor code={code} onChange={setCode} />

      <p className="mt-3 text-sm text-gray-400">
        🧾 以下のコードは固定で実行されます（編集しないでOK！）
      </p>
      <pre className="bg-black text-white p-3 rounded mt-1 border border-gray-700">
        {`const name = "ナナミ";
greet(name);`}
      </pre>

      <div className="flex flex-row gap-4 my-4 flex-wrap items-start">
        <RunButton onClick={runCode} />
        <HintBox
          hints={[
            "`function greet(name) { ... }` のように関数を定義してみよう！",
            "`console.log(&quot;こんにちは、&quot; + name + &quot;！&quot;);` のように引数 name を使ってみよう！",
            "固定コードで `greet(name)` が呼ばれるから、関数だけ定義すればOKだよ！",
          ]}
        />
        <GiveUpButton onGiveUp={handleGiveUp} />
      </div>

      <ResultBox result={result} />

      {gaveUp && (
        <GiveUpResult
          answerCode={`function greet(name) {\n  console.log(&quot;こんにちは、&quot; + name + &quot;！&quot;);\n}`}
        />
      )}

      {cleared && (
        <>
          <ClearMessage />
          {showExplanation && (
            <ExplanationBox>
              <p className="mb-1">
                <code>name</code> に渡された値を使って、関数の中で
                `&quot;こんにちは、ナナミ！&quot;` を出力できたね！
              </p>
              <p>
                引数で受け取った値を使ってメッセージを作ることができれば、
                <br />
                どんな名前にも対応できる関数が作れるようになるよ！✨
              </p>
            </ExplanationBox>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/levels/5">
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
