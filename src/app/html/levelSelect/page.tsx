"use client";

import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { Card, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

const levels = [
  { level: 1, title: "<p> タグ", description: "文字を表示してみよう！" },
  { level: 2, title: "<h1> タグ", description: "見出しをつけよう！" },
  { level: 3, title: "<img> タグ", description: "画像を表示してみよう！" },
  { level: 4, title: "<ul> リスト", description: "リストを作ってみよう！" },
  { level: 5, title: "ボタンと宝箱", description: "宝物を見つけよう！" },
];

export default function HtmlLevelSelect() {
  return (
    <PageLayout>
      <Container className="text-center py-4">
        <h1 className="fw-bold text-danger mb-4 display-5">🧱 HTMLレッスン</h1>
        <p className="text-muted mb-4 fs-5">
          好きなレベルを選んで学習を始めよう！
          <br />
          <Link href="/">🏠 ホームに戻る</Link>
        </p>

        <Row className="g-4 justify-content-center">
          {levels.map(({ level, title, description }) => (
            <Col key={level} xs={10} sm={6} md={4} lg={3}>
              <Link href={`/html/level${level}`} passHref legacyBehavior>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Card className="h-100 shadow border-3 border-info clickable rounded-4">
                    <Card.Body>
                      <h5 className="fw-bold text-primary">Level {level}</h5>
                      <div className="text-success fs-5">{title}</div>
                      <p className="text-muted small mt-2">{description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </PageLayout>
  );
}
