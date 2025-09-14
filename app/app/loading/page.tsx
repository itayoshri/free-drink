import CompletedPage from "@/components/UI/Completed";
import LoadingPage from "@/components/UI/Loading";

export default function Loading() {
  const loading = false;
  return loading ? <LoadingPage /> : <CompletedPage></CompletedPage>;
}
