// components/ExplanationBox.tsx
type Props = {
  children: React.ReactNode;
};

export default function ExplanationBox({ children }: Props) {
  return (
    <div className="mt-6 p-4 bg-blue-900 text-blue-200 border border-blue-500 rounded">
      <h2 className="font-bold mb-2 text-lg">🧠 解説：</h2>
      {children}
    </div>
  );
}
