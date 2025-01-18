import { getUserAction } from "@/actions/auth";
import AvatarUploader from "@/components/profile/avatar-uploader";
import { User } from "@/types";

const Profile = async () => {
  const user = (await getUserAction()) as User;

  return (
    <div className="mt-20 flex flex-col items-center gap-2">
      <AvatarUploader src={user.picture} />
      <div className="text-lg">{user.username}</div>
    </div>
  );
};

export default Profile;
