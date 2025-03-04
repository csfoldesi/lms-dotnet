import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./auth";

const router = createRouter({ routeTree, context: { auth: undefined! } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const auth = useAuth();

  return (
    <AuthProvider>
      <RouterProvider router={router} context={{ auth }} />
    </AuthProvider>
  );
}
