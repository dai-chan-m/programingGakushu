"use client";

import { Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";

export default function Prologue() {
  return (
    <Container className="py-5 bg" style={{ maxWidth: "1000px" }}>
      <Card className="shadow border-0 rounded-4">
        <Card.Body className="p-4">
          <h1 className="text-center fw-bold text-primary mb-4">
            コードで学ぶプログラミング
          </h1>

          <Card className="bg-light border-start border-4 border-info mb-4">
            <Card.Body>
              <h5 className="fw-bold mb-3">学習の進め方</h5>
              <ul>
                <li>JavaScript や HTML の実践的な問題に挑戦</li>
                <li>コーディングしながら実践的なスキルを習得</li>
                <li>段階的なヒントと詳細な解説でサポート</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="bg-light border-start border-4 mb-4">
            <Card.Body>
              <h5 className="fw-bold mb-3">公式リファレンス</h5>
              <ul>
                <li>
                  <a
                    href="https://developer.mozilla.org/ja/docs/Web/JavaScript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    JavaScript リファレンス（MDN）
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.mozilla.org/ja/docs/Web/HTML"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-noneC"
                  >
                    HTML リファレンス（MDN）
                  </a>
                </li>
              </ul>
            </Card.Body>
          </Card>

          <div className="text-center mt-5">
            <Row className="justify-content-center">
              <Col md={5} className="mb-3">
                <Link
                  href="/html/level1"
                  className="w-100 py-3 rounded fw-bold text-white btn btn-info"
                >
                  🧱 HTML コース
                </Link>
              </Col>
              <Col md={5} className="mb-3">
                <Link
                  href="/javascript/level1"
                  className="w-100 py-3 rounded fw-bold text-white btn btn-info"
                >
                  💡 JavaScript コース
                </Link>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
