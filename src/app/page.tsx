"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Prologue() {
  const router = useRouter();

  const handleStart = () => {
    const se = new Audio("/se/start.mp3");
    se.play();
    router.push("/levels/1");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-black text-white font-mono overflow-hidden">
      {/* BGM */}
      <audio autoPlay loop>
        <source src="/bgm/escape-ambient.mp3" type="audio/mp3" />
      </audio>

      {/* 背景 */}
      <div className="absolute inset-0 opacity-10 bg-[url('/bg-dark-temple.jpg')] bg-cover bg-center pointer-events-none" />

      {/* 本文 */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-400 text-center drop-shadow-lg animate-pulse">
          🗝 Escape Quest
        </h1>
        <p className="text-center text-gray-400 mt-2 italic">
          ～コードで扉を開け、脱出せよ～
        </p>

        {/* ナレーション */}
        <div className="bg-black/50 p-6 rounded-xl shadow-lg mt-12 text-lg text-gray-300 leading-relaxed animate-fadeIn">
          <p className="mb-4">――暗闇の中、あなたは目を覚ました。</p>
          <p className="mb-4">
            足元には魔法陣。手には古びた巻物。そして目の前には…閉ざされた扉。
          </p>
          <p className="mb-4">
            「この扉を開けるには、
            <span className="text-green-300">コードの力</span>が必要だ――」
          </p>
          <p>
            ここから、あなたの冒険が始まる。
            <br />
            <span className="text-yellow-300 font-bold">Escape Quest</span>
            ――それは、コードで世界を解き明かす旅。
          </p>
        </div>

        {/* ルール説明 */}
        <div className="bg-black/40 p-6 rounded-xl mt-10 shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-300 mb-3 border-b border-yellow-600 pb-1">
            🎮 ゲームのルール
          </h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>各ステージには JavaScript のお題があります</li>
            <li>コードを書いて正しい出力を導けば扉が開きます</li>
            <li>ヒントや解説で助けを借りながら進もう！</li>
          </ul>
        </div>

        {/* 参考リンク */}
        <div className="bg-black/40 p-6 rounded-xl mt-8 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-300 mb-3 border-b border-blue-600 pb-1">
            📚 困ったときの参考リンク
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-blue-200">
            <li>
              <a
                href="https://developer.mozilla.org/ja/docs/Web/JavaScript"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                MDN: JavaScript公式ドキュメント
              </a>
            </li>
            <li>
              <a
                href="https://www.javadrive.jp/javascript/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                JavaDrive: JS入門
              </a>
            </li>
            <li>
              <a
                href="https://ja.javascript.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                JavaScript.info（日本語訳）
              </a>
            </li>
          </ul>
        </div>

        {/* レベル選択 */}
        <div className="bg-black/40 p-6 rounded-xl mt-8 shadow-lg">
          <h2 className="text-2xl font-bold text-purple-300 mb-3 border-b border-purple-600 pb-1">
            🎯 レベル選択
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
            {[...Array(10)].map((_, i) => (
              <Link
                key={i + 1}
                href={`/levels/${i + 1}`}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold p-3 rounded-lg text-center transition duration-200 hover:scale-105 hover:shadow-lg"
              >
                レベル {i + 1}
              </Link>
            ))}
          </div>
        </div>

        {/* スタートボタン */}
        <div className="text-center mt-12">
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-gradient-to-r from-green-400 via-green-300 to-green-400 text-black font-bold text-xl rounded-full shadow-xl hover:scale-105 hover:brightness-110 transition transform duration-200"
          >
            ▶ 冒険を始める！
          </button>
        </div>
      </div>
    </div>
  );
}
