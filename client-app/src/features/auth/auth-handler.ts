import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export const AuthHandler = () => {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      const saveToken = async () => {
        const jwt = await getToken();
        if (jwt) {
          localStorage.setItem("clerk-jwt", jwt);
        }
      };

      saveToken();
      console.log("AuthHandler");
    }
  }, [isSignedIn, getToken]);

  return null;
};
