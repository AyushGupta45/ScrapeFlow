import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";

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
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col min-h-screen w-screen bg-muted">
        <DashboardNavbar />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            <BreadcrumbHeader />
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;