export default function ClearMessage() {
  return (
    <div className="mt-10 text-center">
      <audio autoPlay src="/sounds/door-open.mp3" />
      <div className="text-3xl md:text-5xl font-extrabold text-green-400 animate-bounce drop-shadow-glow">
        🎉 正解！🚪扉が開いた…ゴゴゴ…✨
      </div>
      <div className="mt-6 animate-fadeInSlow">
        <p className="text-lg md:text-xl text-green-300 italic">
          あなたはこの部屋から脱出した…！
        </p>
        <p className="text-sm text-gray-400 mt-2">次のステージが待っている…</p>
      </div>
    </div>
  );
}
