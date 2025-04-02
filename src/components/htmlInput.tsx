import { useState } from "react";
import { Form } from "react-bootstrap";

export const HtmlInput = (input: string) => {
  const [code, setCode] = useState(input);

  return (
    <Form.Group className="mb-4">
      <Form.Label className="fw-bold">💡 HTMLコードを書いてみよう！</Form.Label>
      <Form.Control
        as="textarea"
        rows={4}
        className="font-monospace"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </Form.Group>
  );
};
