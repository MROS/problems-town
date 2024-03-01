export function PlainCode(props: { text: string }) {
  return (
    <pre>
      <code>{props.text}</code>
    </pre>
  );
}
export const inLineFormula =
  "一元二次公式解 $x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$ ，會推導了嗎？";
export const blockFormula = "$$\n x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a} \n$$";
export const codeFormula =
  "```math\nx = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}\n```";
