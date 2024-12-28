import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log("user: ", user);

  return <div>Welcome {user?.given_name}</div>;
}
