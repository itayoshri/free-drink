import { content } from "@/interfaces/api/res";
import { GetQuestionnaireFromServer } from "../content/expandedContent";
import { Db } from "mongodb";
import { DBContent } from "@/interfaces/db";

//TODO: static DB class

export default async function UpdateContent(
  contents: content[],
  token: string,
  db: Db
) {
  const serverContents = db.collection("contents");
  await serverContents.deleteMany({});

  const updatedContents = [];
  for (const content of contents) {
    const { formatType: type, id } = content;
    try {
      const expandedContent = await GetQuestionnaireFromServer(id, type, token);
      const formattedContent = {
        contentId: content.id,
        type: content.formatType,
        content: expandedContent.body?.content,
      };
      updatedContents.push(formattedContent);
    } catch {}
  }

  await db.collection("contents").insertMany(updatedContents);
}

export async function GetContentById(contentId: number, db: Db) {
  const contents = db.collection("contents");
  const content = await contents.findOne<DBContent>({
    contentId: contentId,
  });
  return content?.content;
}
