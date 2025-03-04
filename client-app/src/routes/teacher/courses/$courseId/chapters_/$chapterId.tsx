import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/courses/$courseId/chapters_/$chapterId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Chapter</div>;
}
