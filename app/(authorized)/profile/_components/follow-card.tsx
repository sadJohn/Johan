import ActionButton from "@/components/common/action-button";
import UserAvatar from "@/components/profile/user-avatar";
import {
  Card,
  CardDescription,
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
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-end gap-2">
          <UserAvatar user={user} />
          <div>
            <CardTitle>{user.username}</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </div>
        </div>
        <div>
          <form action={action}>
            <ActionButton>{label}</ActionButton>
          </form>
        </div>
      </CardHeader>
    </Card>
  );
};

export default FollowCard;
