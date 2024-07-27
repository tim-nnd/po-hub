"use client";

import { useAlert } from "@/components/ui/AlertProvider";
import { useAuth } from "@/components/ui/AuthProvider";
import { Button } from "@/components/ui/Button";
import { getFirebaseClientApp } from "@/lib/getFirebaseClientApp";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { showAlert } = useAlert();

  const logOut = async () => {
    const auth = getAuth();

    if (!auth.currentUser) return;
    await auth.signOut();
    showAlert(`Logged out`);
    setTimeout(() => router.push('/'), 1500);
  }

  useEffect(() => {
    getFirebaseClientApp();
  }, [])


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-20">
        <Link href="/create-product">
          <Button variant="primary" className="flex items-center px-4 py-2">
            Create Product
          </Button>
        </Link>
        <Button onClick={logOut} variant="secondary" className="flex items-center px-4 py-2">
          Log Out
        </Button>
      </div>
    </div>
  )
}