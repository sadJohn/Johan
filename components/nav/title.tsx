import Link from "next/link";

import clsx from "clsx";
import { LucideActivity } from "lucide-react";

import { playwriteFont, rubikBubblesFont } from "@/lib/fonts";

const Title = () => {
  return (
    <Link href={"/home"} className="ml-2 flex items-center">
      <LucideActivity />
      <span
        className={clsx(
          "ml-2 scale-100 text-2xl dark:scale-0",
          playwriteFont.className
        )}
      >
        Johan
      </span>
      <span
        className={clsx(
          "absolute ml-8 scale-0 text-2xl dark:scale-100",
          rubikBubblesFont.className
        )}
      >
        Johan
      </span>
    </Link>
  );
};

export default Title;
