export default function CodeEditor({
  code,
  onChange,
}: {
  code: string;
  onChange: (value: string) => void;
}) {
  return (
    <textarea
      value={code}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-48 p-3 text-sm bg-black text-green-300 border border-gray-600 rounded shadow-inner font-mono"
    />
  );
}
