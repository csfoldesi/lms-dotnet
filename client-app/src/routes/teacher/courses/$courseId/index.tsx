import { CourseSetup } from "@/features/courses/_components/course-setup";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/courses/$courseId/")({
  component: CourseSetup,
});
