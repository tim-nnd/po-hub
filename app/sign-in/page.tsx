"use client";

import { useAuth } from "@/components/ui/AuthProvider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { useCallback } from "react";

export default function SignInPage() {
  const { user, setUser } = useAuth();
  
  const handleAuthWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(getAuth(), new GoogleAuthProvider());
      if (!result) return;

      let user: User = await syncUser();
      setUser(user);

      alert(`Authenticated as ${user.email}`);
    } catch (error: any) {
      const errorMessage = error.message;
      alert(errorMessage);
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

function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
