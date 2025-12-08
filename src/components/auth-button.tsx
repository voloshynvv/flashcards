"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { Button } from "./ui/button";
import { Loader } from "./ui/loader";

export const AuthButton = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const handleSignIn = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  if (isPending) {
    return <Loader className="size-5" />;
  }

  if (!session) {
    return (
      <Button variant="secondary" onClick={handleSignIn}>
        Sign In
      </Button>
    );
  }

  return (
    <Button variant="secondary" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};
