import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <div>HOME PAGE</div>
      <Link href={"/chat"}>CHAT PAGE</Link>
    </div>
  );
}
