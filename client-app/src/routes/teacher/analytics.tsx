import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/analytics")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Analytics</div>;
}
