import CompletedPage from "@/app/Completed";
import LoadingPage from "@/app/Loading";

export default function Loading() {
  const loading = false;
  return loading ? <LoadingPage /> : <CompletedPage></CompletedPage>;
}
