import { ResPurchaseNayaxCardGift } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";
import { ReqPurchaseNayaxCardGift } from "@/interfaces/api/requests";

export default function purcheseCardGift(uniqueId: string, token: string) {
  return fetchDataSource<ResPurchaseNayaxCardGift>({
    method: "GET",
    namespace: "myPrezi",
    action: "nayaxMetadata",
    token,
    data: {
      credits: 1,
      uniqueId,
      paymentType: "Corks",
    } as ReqPurchaseNayaxCardGift,
  });
}
