import { useEffect, useState } from "react";
import { containsDangerousHtml } from "@/utils/htmlValidation";

export function useSafeHtml(code: string) {
  const [isSafe, setIsSafe] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    if (code.trim() === "") {
      setIsSafe(true);
      setWarningMessage("");
      return;
    }

    if (containsDangerousHtml(code)) {
      setIsSafe(false);
      setWarningMessage(
        "🚫 安全のため、一部のタグや属性の使用は禁止されています。"
      );
    } else {
      setIsSafe(true);
      setWarningMessage("");
    }
  }, [code]);

  return { isSafe, warningMessage };
}
