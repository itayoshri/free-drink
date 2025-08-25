import { content } from "@/interfaces/api/res";
import GetDB from ".";
import GetQuestionnaire from "../content/expandedContent";

export default async function UpdateContent(
  contents: content[],
  token: string
) {
  const { db, client } = GetDB();
  const serverContents = db.collection("contents");

  for (const content of contents) {
    if (!(await serverContents.findOne({ ["id"]: content.id }))) {
      try {
        const expandedContent = await GetQuestionnaire(
          content.id,
          content.formatType,
          token
        );
        if (content.id == 6740) {
          console.log(expandedContent);
        }
        const formattedContent = {
          contentId: content.id,
          type: content.formatType,
          points: content.rewardingCaps,
          content: expandedContent.body.content,
        };
        await db.collection("contents").insertOne(formattedContent);
      } catch {}
    }
  }

  client.close();
}

export async function GetContent() {
  const { db, client } = GetDB();

  const contents = db.collection("contents");
  const res = await contents.find({ ["points"]: 10 }).toArray();

  client.close();
  return res;
}
