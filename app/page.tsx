import { User } from "@/types";

export default async function Home() {
  const users = (await fetch("https://johan-server.onrender.com").then((res) =>
    res.json()
  )) as User[];
  return (
    <>
      {users.map(({ id, name, age, email }) => (
        <div key={id}>
          <div>name: {name}</div>
          <div>age: {age}</div>
          <div>email: {email}</div>
        </div>
      ))}
    </>
  );
}
