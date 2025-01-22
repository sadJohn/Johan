"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const FollowTabs = () => {
  const pathname = usePathname();

  return (
    <div className="mb-2 flex gap-2">
      <Button
        variant={pathname.includes("/followers") ? "default" : "ghost"}
        asChild
      >
        <Link href={"/profile/followers"}>Followers</Link>
      </Button>
      <Button
        variant={pathname.includes("/following") ? "default" : "ghost"}
        asChild
      >
        <Link href={"/profile/following"}>Followering</Link>
      </Button>
    </div>
  );
};

export default FollowTabs;
