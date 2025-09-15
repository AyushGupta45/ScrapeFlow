import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="flex flex-col h-screen w-screen bg-white">{children}</main>
  );
};

export default Layout;
