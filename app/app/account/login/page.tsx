import Input from "@/components/input";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const phoneNumber = searchParams?.phoneNumber || "";

  return <div></div>;
}
