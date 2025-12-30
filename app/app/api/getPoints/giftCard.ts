import getProducts from "@/utils/myPrezi/nayaxMetadata";
import purcheseGiftCard from "@/utils/myPrezi/purchaseNayaxCardGift";

export default async function getGiftCard(accessToken: string) {
  const giftId = (await getProducts(accessToken)).body.gift.uniqueId;
  try {
    const giftCard = await purcheseGiftCard(giftId, accessToken);
    console.log(giftCard);
    return { cardId: giftCard.body.nayaxCard.cardId };
  } catch (e) {}
}
