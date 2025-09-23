const BASE_PROMPT = "";

export default function BuildPrompt(prompt: string, data: object) {
  return `${prompt}
    ${JSON.stringify(data)}`;
}
