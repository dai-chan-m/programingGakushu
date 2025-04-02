// components/HtmlPreview.tsx
import { Alert } from "react-bootstrap";

type Props = {
  html: string;
  warning?: string;
};

export default function HtmlPreview({ html, warning }: Props) {
  return (
    <div className="mt-4">
      <h5 className="fw-bold mb-2">🌈 表示結果プレビュー</h5>
      {warning ? (
        <Alert variant="danger" className="text-center">
          {warning}
        </Alert>
      ) : (
        <div
          className="border rounded p-3 bg-white"
          style={{ minHeight: "60px" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
