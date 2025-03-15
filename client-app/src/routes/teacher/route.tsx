import { Button } from "@/components/ui/button";
import { Sidebar } from "@/features/dashboard/sidebar/sidebar";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { createFileRoute, Link, Navigate, Outlet } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/teacher")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoaded, isSignedIn } = useAuth();
  if (isLoaded && !isSignedIn) return <Navigate to="/auth" />;

  return (
    <div className="h-fll">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <div className="flex justify-end items-center h-full pr-4 bg-background">
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
        <Sidebar type="teacher" />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <Outlet />
      </main>
    </div>
  );
}
