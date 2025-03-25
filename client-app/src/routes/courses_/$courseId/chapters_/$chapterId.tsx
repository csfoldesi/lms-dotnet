import { ChapterPlayback } from "@/features/playback/_components/chapter-playback";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses_/$courseId/chapters_/$chapterId")({
  component: ChapterPlayback,
});
