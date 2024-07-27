"use client";

import Link from "next/link";
import HomeIcon from "../icon/HomeIcon";
import ShoppingBagIcon from "../icon/ShoppingBagIcon";
import EnvelopeIcon from "../icon/EnvelopeIcon";
import UserIcon from "../icon/UserIcon";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";

export default function BottomNavBar() {
  const { appUser, user } = useAuth();
  const [accountLink, setAccountLink] = useState("/sing-in");

  useEffect(() => {
    if (!appUser) {
      setAccountLink('/sign-in')
    } else if (!appUser.phone_number) {
      setAccountLink('/sign-in/phone')
    } else {
      setAccountLink('/account')
    }

  }, [appUser, user])

  return (
    <nav className="sticky bottom-0 z-50 flex h-14 max-w-[500px] items-center justify-around shadow-t">
      <Link
        href="/"
        className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        prefetch={false}
      >
        <HomeIcon />
        <span className="text-xs font-medium">Home</span>
      </Link>
      <Link
        href="/order"
        className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        prefetch={false}
      >
        <ShoppingBagIcon />
        <span className="text-xs font-medium">Orders</span>
      </Link>
      {/* <Link
          href="/inbox"
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          prefetch={false}
        >
          <EnvelopeIcon />
          <span className="text-xs font-medium">Inbox</span>
        </Link> */}
      <Link
        href={accountLink}
        className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        prefetch={false}
      >
        <UserIcon />
        <span className="text-xs font-medium">Account</span>
      </Link>
    </nav>
  )
}