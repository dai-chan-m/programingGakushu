// components/PageLayout.tsx
import { Container, Card } from "react-bootstrap";
import { ReactNode } from "react";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="py-5 bg" style={{ maxWidth: "1000px" }}>
      <Card className="shadow border-0 rounded-4">
        <Card.Body className="p-4">{children}</Card.Body>
      </Card>
    </Container>
  );
}
