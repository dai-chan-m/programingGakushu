type Props = {
  result: string;
};

export default function ResultBox({ result }: Props) {
  // 改行をbrタグに変換する
  const formattedResult = result.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < result.split('\n').length - 1 && <br />}
    </span>
  ));

  return (
    <div className="mt-4 p-4 bg-gray-900 border border-gray-700 rounded text-sm shadow-md whitespace-pre-wrap">
      {formattedResult}
    </div>
  );
}
