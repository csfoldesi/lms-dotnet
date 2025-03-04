import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/courses/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Courses</div>;
}
