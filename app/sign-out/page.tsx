"use client";

import { useAuth } from "@/components/ui/AuthProvider";
import { getFirebaseClientApp } from "@/lib/getFirebaseClientApp";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOutPage() {
  const { user } = useAuth();
  const router = useRouter();

  const logOut = async () => {
    const auth = getAuth();

    if (!auth.currentUser) return;
    await auth.signOut();
  }

  useEffect(() => {
    if (!user) return;
    getFirebaseClientApp();
    logOut();
  }, [user])


  return (
    <>
      Logout, redirecting to home page...
    </>
  );
}
