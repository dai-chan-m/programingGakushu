"use client";

import { useRef, useEffect } from "react";

type Props = {
  code: string;
  onLog: (logs: string[]) => void;
  onError: (error: string) => void;
};

export default function SandboxRunner({ code, onLog, onError }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // メッセージ受信イベント登録
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, payload } = event.data;

      if (type === "done") {
        onLog(payload); // logs: string[]
      } else if (type === "error") {
        onError(payload); // error message
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onLog, onError]);

  // コード実行
  const run = () => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "execute", code },
      "*"
    );
  };

  return (
    <div className="my-4">
      <iframe
        ref={iframeRef}
        src="/sandbox.html"
        sandbox="allow-scripts"
        style={{ display: "none" }}
      />
      <button
        onClick={run}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        ▶ 実行
      </button>
    </div>
  );
}
