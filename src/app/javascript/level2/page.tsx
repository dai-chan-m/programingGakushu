"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import CodeEditor from "@/components/CodeEditor";
import RunButton from "@/components/RunButton";
import ResultBox from "@/components/ResultBox";
import ClearMessage from "@/components/ClearMessage";
import HintBox from "@/components/HintBox";
import ExplanationBox from "@/components/ExplanationBox";
import GiveUpButton from "@/components/GiveUpButton";
import GiveUpResult from "@/components/GiveUpResult";
import PageLayout from "@/components/PageLayout";

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
      console.log = (msg: string) => logs.push(String(msg));
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
      "😢 ギブアップ…でも答えを見て学べるぞ！\n\n【正解例を表示します】"
    );
  };

  return (
    <PageLayout>
      <h1 className="text-center fw-bold text-primary mb-3">
        💡 JavaScript - Level 2
      </h1>
      <p className="text-center text-muted mb-4">if文を使って「扉が開いた！」と表示させよう！</p>

      <Card className="bg-light border-start border-4 border-warning mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-2">
            ✅ レベル2：条件分岐
          </h5>
          <p>
            変数の値を変更し、if文内のコードが実行されるようにしましょう。
            出力の表示は「扉が開いた！」と出すために修正が必要です。
          </p>
        </Card.Body>
      </Card>

      <CodeEditor code={code} onChange={setCode} />

      <div className="d-flex gap-2 my-4 flex-wrap">
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

          <div className="text-center mt-5">
            <Link href="/javascript/level3">
              <Button 
                variant="warning"
                className="px-4 py-2 rounded-pill fw-bold text-dark"
              >
                ▶ レベル3へすすむ
              </Button>
            </Link>
          </div>
        </>
      )}
    </PageLayout>
  );
}