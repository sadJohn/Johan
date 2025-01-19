"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const FollowTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      <Button
        variant={pathname === "/profile/followers" ? "default" : "ghost"}
        asChild
      >
        <Link href={"/profile/followers"}>Followers</Link>
      </Button>
      <Button
        variant={pathname === "/profile/following" ? "default" : "ghost"}
        asChild
      >
        <Link href={"/profile/following"}>Followering</Link>
      </Button>
    </div>
  );
};

export default FollowTabs;
