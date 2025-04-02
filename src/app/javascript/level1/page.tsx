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

export default function Level1() {
  const initialCode = `const message = "Help! I'm stuck!";\nconsole.log(mesage);`;

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

      if (logs.includes("Help! I'm stuck!")) {
        setResult(`✅ 正解！扉が開いた…ゴゴゴ…🚪✨\n\n${detailedResult}`);
        setCleared(true);
        setShowExplanation(true);
      } else {
        setResult(`🌀 うーん…まだ何かが違うみたいだ\n\n${detailedResult}`);
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
        💡 JavaScript - Level 1
      </h1>
      <p className="text-center text-muted mb-4">コードを修正して脱出しよう！</p>

      <Card className="bg-light border-start border-4 border-warning mb-4">
        <Card.Body>
          <h5 className="fw-bold mb-2">
            ✅ レベル1：変数と出力
          </h5>
          <p>
            変数名のスペルミスを見つけて修正してください。
            <code>console.log()</code>は、値を出力するためのコマンドです。
          </p>
        </Card.Body>
      </Card>

      <CodeEditor code={code} onChange={setCode} />

      <div className="d-flex gap-2 my-4 flex-wrap">
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
          <div className="text-center mt-5">
            <Link href="/javascript/level2">
              <Button 
                variant="warning"
                className="px-4 py-2 rounded-pill fw-bold text-dark"
              >
                ▶ レベル2へすすむ
              </Button>
            </Link>
          </div>
        </>
      )}
    </PageLayout>
  );
}