import { getUser, logout } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserButton = async () => {
  const userInfo = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex h-12 items-center gap-3">
          <Avatar>
            <AvatarImage src={`${userInfo?.picture}`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>{userInfo?.username}</div>
        </Button>
      </DropdownMenuTrigger>
      {userInfo && (
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action={logout}>
              <Button type="submit" variant="ghost">
                Log out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserButton;
