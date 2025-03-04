import { useAuth } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/")({
  component: RouteComponent,
  beforeLoad: () => {},
});

function RouteComponent() {
  const { userId } = useAuth();

  return <div>Hello "/teacher/"!: {userId}</div>;
}
