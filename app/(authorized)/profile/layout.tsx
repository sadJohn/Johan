import Sider from "./_components/Sider";

export default async function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex-1 sm:max-w-96">
        <Sider />
      </div>
      <div className="flex-2">{children}</div>
    </div>
  );
}
