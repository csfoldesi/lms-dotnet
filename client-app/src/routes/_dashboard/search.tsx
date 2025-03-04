import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/search")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Search</div>;
}
