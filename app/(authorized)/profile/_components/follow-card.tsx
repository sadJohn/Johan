import ActionButton from "@/components/common/action-button";
import UserAvatar from "@/components/profile/user-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types";

interface FollowCardProps {
  user: User;
  label: React.ReactNode;
  action: () => Promise<void>;
}

const FollowCard = ({ user, action, label }: FollowCardProps) => {
  return (
    <Card className="flex flex-row">
      <CardHeader>
        <UserAvatar user={user} />
      </CardHeader>
      <CardContent className="flex-1 self-end p-6 pl-0">
        <CardTitle>{user.username}</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardContent>
      <CardFooter className="p-6">
        <form action={action}>
          <ActionButton>{label}</ActionButton>
        </form>
      </CardFooter>
    </Card>
  );
};

export default FollowCard;
