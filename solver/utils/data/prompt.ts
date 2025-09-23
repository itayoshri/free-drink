const BASE_PROMPT = "";

export default function DataToPrompt(prompt: string, data: object) {
  return `${prompt}
    ${data}`;
}
