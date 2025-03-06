import { useCourseId } from "@/hooks/use-course-id";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/courses/$courseId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const courseId = useCourseId();

  return <div>Course: {courseId}</div>;
}
