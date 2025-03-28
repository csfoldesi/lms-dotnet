import { Analytics } from "@/features/teacher/_components/analytics";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/analytics")({
  component: Analytics,
});
