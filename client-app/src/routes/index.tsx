import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center items-center h-full">
      <Button>
        <Link to="/dashboard">Go to dashboard</Link>
      </Button>
    </div>
  );
}
