import { Dashboard } from "@/features/dashboard/_components/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/")({
  component: Dashboard,
});
