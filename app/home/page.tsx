import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>HOME PAGE</div>
      <Link href={"/chat"}>CHAT PAGE</Link>
    </div>
  );
}
