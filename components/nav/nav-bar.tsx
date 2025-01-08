import Link from "next/link";

import { LucideActivity } from "lucide-react";

import ModeSwitcher from "./mode-switcher";
import UserButton from "./user-button";

const NavBar = () => {
  return (
    <nav className="flex justify-between px-4 py-2 shadow-md">
      <Link href={"/home"} className="ml-2 flex items-center">
        <LucideActivity />
        <span className="ml-2 text-2xl">Johan</span>
      </Link>
      <div className="flex items-center gap-2">
        <ModeSwitcher />
        <UserButton />
      </div>
    </nav>
  );
};

export default NavBar;
