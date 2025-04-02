"use client";

import PageLayout from "@/components/PageLayout";
import { Card } from "react-bootstrap";
import Image from "next/image";

export default function HtmlTreasurePage() {
  return (
    <PageLayout>
      <div className="text-center">
        <h1 className="fw-bold text-warning mb-4">🎉 宝を見つけた！</h1>
        <p className="mb-4">
          あなたはリンクをたどって、ついに宝の地図の場所にたどり着いた！
        </p>

        <Card className="bg-light border border-3 border-warning shadow mb-4">
          <Card.Body>
            <p className="fw-bold">🎁 中には、こんなお宝が…！？</p>
            <Image
              src="/images/treasure-chest.png"
              alt="宝箱"
              width={240}
              height={240}
              className="rounded mx-auto d-block"
            />
            <p className="mt-3 text-success">
              君のHTML力は確実にレベルアップしている…！
            </p>
          </Card.Body>
        </Card>

        <a href="/html/level5">
          <button className="btn btn-success fw-bold px-4 py-2 rounded-pill">
            ▶ 戻る
          </button>
        </a>
      </div>
    </PageLayout>
  );
}
