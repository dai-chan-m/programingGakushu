import { Form } from "react-bootstrap";

export default function CodeEditorHtml({
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
