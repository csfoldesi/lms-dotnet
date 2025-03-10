import { ChapterSetup } from "@/features/courses/chapters/_components/chapter-setup";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/courses/$courseId/chapters_/$chapterId")({
  component: ChapterSetup,
});
