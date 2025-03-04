import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses_/$courseId/chapters_/$chapterId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Chapter playback page</div>;
}
