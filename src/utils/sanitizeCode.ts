// utils/sanitizeCode.ts
export function detectDangerousCode(code: string): string | null {
  const patterns = [
    {
      pattern: /while\s*\(\s*true\s*\)/,
      reason: "無限ループ（while(true)）は禁止です",
    },
    { pattern: /fetch\s*\(/, reason: "fetch は使用できません" },
    { pattern: /XMLHttpRequest/, reason: "XMLHttpRequest は使用できません" },
    { pattern: /document\./, reason: "document へのアクセスは禁止です" },
    { pattern: /window\./, reason: "window へのアクセスは禁止です" },
    { pattern: /location\s*[\.\=]/, reason: "location の操作は禁止です" },
    { pattern: /alert\s*\(/, reason: "alert は使用できません" },
    { pattern: /prompt\s*\(/, reason: "prompt は使用できません" },
    { pattern: /confirm\s*\(/, reason: "confirm は使用できません" },
    { pattern: /Function\s*\(/, reason: "Function コンストラクタは禁止です" },
    { pattern: /eval\s*\(/, reason: "eval の再利用は禁止です" },
    { pattern: /setInterval\s*\(/, reason: "setInterval は使用できません" },
    { pattern: /setTimeout\s*\(/, reason: "setTimeout は使用できません" },
  ];

  for (const { pattern, reason } of patterns) {
    if (pattern.test(code)) {
      return reason;
    }
  }

  return null; // 問題なし
}

/**
 * コードに危険な操作が含まれていないかチェックする関数
 * 新しいレベル用に追加 (レベル5-10で使用)
 * @param code チェックするコード文字列
 * @returns 危険な操作が見つかった場合は true、安全なら false
 */
export function sanitizeCode(code: string): boolean {
  return detectDangerousCode(code) !== null;
}
