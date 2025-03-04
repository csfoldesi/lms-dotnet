import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/courses/$courseId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Course</div>;
}
