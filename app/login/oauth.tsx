import Link from "next/link";

import Github from "@/components/icons/github";
import { Button } from "@/components/ui/button";

const Oauth = () => {
  return (
    <>
      {/* <Button className="w-full" variant="outline">
        <Google />
        <Link href={"/login/google"}>Sign in with Google</Link>
      </Button> */}
      <Button className="w-full" variant="outline">
        <Github />
        <Link href={"/login/github"}>Sign in with Github</Link>
      </Button>
    </>
  );
};

export default Oauth;
