"use client";

import UserIcon from "@/components/icon/UserIcon";
import { useAlert } from "@/components/ui/AlertProvider";
import { useAuth } from "@/components/ui/AuthProvider";
import { Button } from "@/components/ui/Button";
import { getFirebaseClientApp } from "@/lib/getFirebaseClientApp";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { appUser } = useAuth();
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
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-2">Account</h1>
      <hr className="mb-6" />
      <div className="flex flex-col px-4 pl-8 pt-10 text-center">
        <div className="mx-auto mb-8">
          <div className="w-20 h-20 border rounded-full flex justify-center items-center">
            <span className="text-4xl">{(appUser?.username || 'Guest')[0]}</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold">{appUser?.username || 'Guest'}</h2>
        <p className="text-secondary">{appUser?.email || 'Email'}</p>
        <p className="text-xl font-bold mt-4">{appUser?.phone_number || '+62 812 3456 789'}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-20">
          <Link href="/create-product">
            <Button variant="primary" className="w-full items-center px-4 py-2 mb-4">
              Create Product
            </Button>
          </Link>
          <Button onClick={logOut} variant="secondary" className="w-full items-center px-4 py-2">
            Log Out
          </Button>
        </div>
      </div>
    </main>
  )
}