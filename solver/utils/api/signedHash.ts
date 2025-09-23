import crypto from "crypto";

export default function GenerateSignedHash(
  questionId: number,
  questionnaireId: number
) {
  // TODO: support Hotspot
  const SECRET = process.env.SECRET;
  const input = `${questionId}|${questionnaireId}|${SECRET}`;
  return crypto.createHash("md5").update(input).digest("hex");
}
