import { useAuth } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { getToken } = useAuth();

  const tokenTest = async () => {
    const token = await getToken();
    console.log(token);
  };

  return (
    <div>
      Dashboard
      <button onClick={() => tokenTest()}>TokenTest</button>
    </div>
  );
}
