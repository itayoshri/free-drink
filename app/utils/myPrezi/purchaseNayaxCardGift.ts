import { ResPurchaseNayaxCardGift } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";
import { ReqPurchaseNayaxCardGift } from "@/interfaces/api/requests";

export default function purcheseGiftCard(uniqueId: string, token: string) {
  return fetchDataSource<ResPurchaseNayaxCardGift>({
    method: "POST",
    namespace: "myPrezi",
    action: "purchaseNayaxCardGift",
    token,
    data: {
      credits: 1,
      uniqueId,
      paymentType: "Corks",
    } as ReqPurchaseNayaxCardGift,
  });
}
