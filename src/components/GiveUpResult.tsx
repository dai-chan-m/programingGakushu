type Props = {
  answerCode: string;
};

export default function GiveUpResult({ answerCode }: Props) {
  return (
    <div className="mt-4 p-4 bg-red-100 text-red-900 border border-red-400 rounded">
      <p className="font-bold mb-2">💡 正解例：</p>
      <pre className="bg-white text-black p-2 rounded overflow-x-auto text-sm">
        {answerCode}
      </pre>
    </div>
  );
}
