import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/_components/user-button";
import { DashboarMobileSidebar } from "@/features/dashboard/sidebar/dashboar-mobile-sidebar";
import { DashboardSidebar } from "@/features/dashboard/sidebar/dashboard-sidebar";
import { useAuth, useUser } from "@clerk/clerk-react";
import { createFileRoute, Link, Navigate, Outlet } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/teacher")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userIsLoaded } = useUser();
  if (isLoaded && !isSignedIn) return <Navigate to="/" />;
  if (userIsLoaded && user?.publicMetadata?.role !== "Teacher") return <Navigate to="/" />;

  return (
    <div className="h-fll">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <div className="flex justify-end items-center h-full pr-4 bg-background">
          <DashboarMobileSidebar type="teacher" />
          <div className="flex-1" />
          <Link to="/">
            <Button size="sm" variant="ghost" className="cursor-pointer mr-2">
              <LogOut className="h-4 w-4 mr-2" />
              Exit from teacher mode
            </Button>
          </Link>
          <UserButton />
        </div>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <DashboardSidebar type="teacher" />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <Outlet />
      </main>
    </div>
  );
}
