// utils/htmlValidation.ts

export function containsDangerousHtml(input: string): boolean {
  const pattern = /<(script|iframe|object|embed|link|meta)[^>]*>/gi;
  const onEventPattern = /on\w+=/gi;
  const jsProtocolPattern = /javascript:/gi;

  return (
    pattern.test(input) ||
    onEventPattern.test(input) ||
    jsProtocolPattern.test(input)
  );
}
