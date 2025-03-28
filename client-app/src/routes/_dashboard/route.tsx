import { Button } from "@/components/ui/button";
import { Sidebar } from "@/features/dashboard/sidebar/sidebar";
import { SearchInput } from "@/features/search/_components/search-input";
import { UserButton } from "@clerk/clerk-react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-fll">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50 flex justify-between items-center pr-4 bg-background">
        <div className="items-center ml-5 hidden md:block">
          <SearchInput />
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center">
          <Link to="/teacher/courses">
            <Button size="sm" variant="ghost" className="cursor-pointer mr-2">
              Enter teacher mode
            </Button>
          </Link>
          <UserButton />
        </div>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar type="default" />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <Outlet />
      </main>
    </div>
  );
}
