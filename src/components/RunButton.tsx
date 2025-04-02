type Props = {
  onClick: () => void;
};

export default function RunButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition"
    >
      ▶ Run Code!!
    </button>
  );
}
