import { useAuth, UserButton } from "@clerk/clerk-react";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = useAuth();
  if (!userId) return <Navigate to="/auth" />;

  return (
    <div className="h-fll">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        Teacher Navbar <UserButton />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">Sidebar</div>
      <main className="md:pl-56 pt-[80px] h-full">
        <Outlet />
      </main>
    </div>
  );
}
