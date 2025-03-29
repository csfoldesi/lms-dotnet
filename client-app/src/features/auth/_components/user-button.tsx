import { Button } from "@/components/ui/button";
import { UserButton as ClerkUserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { LogIn } from "lucide-react";

export const UserButton = () => {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button variant="outline" size="default" className="rounded-full cursor-pointer">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <ClerkUserButton />
      </SignedIn>
    </>
  );
};
