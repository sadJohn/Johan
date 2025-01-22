import { LucideUserRound } from "lucide-react";

import { User } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvatar {
  user?: User | null;
  className?: string;
}

const UserAvatar = ({ user, className }: UserAvatar) => {
  return (
    <Avatar className={className}>
      {user && (
        <AvatarImage src={user.picture || ""} alt={`${user.username} avatar`} />
      )}
      <AvatarFallback>
        <LucideUserRound />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
