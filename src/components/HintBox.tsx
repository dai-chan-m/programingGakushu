"use client";

import { useState } from "react";

type Props = {
  hints: string[];
};

export default function HintBox({ hints }: Props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded transition w-fit"
      >
        💡 ヒントを見る
      </button>

      {/* ボタンとは別の場所にヒントを表示 */}
      {show && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-900 border border-yellow-400 rounded space-y-2">
          {hints.map((hint, idx) => (
            <p key={idx}>
              🔍 <strong>ヒント{idx + 1}:</strong> {hint}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
