import { content } from "@/interfaces/api/res";
import GetDB from ".";
import GetQuestionnaire, {
  GetQuestionnaireFromServer,
} from "../content/expandedContent";
import { Db } from "mongodb";
import { DBContent } from "@/interfaces/db";

//TODO: static DB class

export default async function UpdateContent(
  contents: content[],
  token: string
) {
  const { db, client } = GetDB();
  const serverContents = db.collection("contents");
  await serverContents.deleteMany({});
  for (const content of contents) {
    const { formatType: type, id } = content;
    if (id == 6761) console.log("it is");
    try {
      const expandedContent = await GetQuestionnaireFromServer(id, type, token);
      //if (id == 6799) console.log(id, expandedContent);
      const formattedContent = {
        contentId: content.id,
        type: content.formatType,
        //points: content.rewardingCaps,
        content: expandedContent.body?.content,
      };
      await db.collection("contents").insertOne(formattedContent);
    } catch {}
  }

  client.close();
}

export async function GetContentById(contentId: number, db: Db) {
  const contents = db.collection("contents");
  const content = await contents.findOne<DBContent>({
    contentId: contentId,
  });
  return content?.content;
}
