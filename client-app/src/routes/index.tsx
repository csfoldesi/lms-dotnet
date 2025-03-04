import { useAuth } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = useAuth();
  return <div className="flex flex-col items-center justify-center h-screen text-amber-700">Hello{userId}</div>;
}
