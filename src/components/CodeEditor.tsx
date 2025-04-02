export function CodeEditor({
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

// components/CodeEditor.tsx
import { Form } from "react-bootstrap";

export function CodeEditorHtml({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Form.Group className="mb-4">
      <Form.Label className="fw-bold">{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={6}
        className="font-monospace"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
}
