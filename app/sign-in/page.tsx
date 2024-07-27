"use client";

import ChromeIcon from "@/components/icon/ChromeIcon";
import { useAlert } from "@/components/ui/AlertProvider";
import { useAuth } from "@/components/ui/AuthProvider";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function SignInPage() {
  const { user, setUser } = useAuth();
  const { showAlert } = useAlert();
  const router = useRouter();

  const handleAuthWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(getAuth(), new GoogleAuthProvider());
      if (!result) return;

      let user: User = await syncUser();
      setUser(user);

      showAlert(`Authenticated as ${user.email}`);
      setTimeout(() => router.push('/'), 1500);
    } catch (error: any) {
      const errorMessage = error.message;
      showAlert(errorMessage);
    }
  }, [])

  const syncUser = async () => {
    const result = (await axios.post(`/api/users/sync`)).data;
    return result.user;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">POHub</h1>
      <div className="mt-20">
        <Button onClick={handleAuthWithGoogle} variant="primary" className="flex items-center px-4 py-2">
          <ChromeIcon className="w-6 h-6 mr-2" />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
