"use client";

import Link from "next/link";
import HomeIcon from "../icon/HomeIcon";
import ShoppingBagIcon from "../icon/ShoppingBagIcon";
import EnvelopeIcon from "../icon/EnvelopeIcon";
import UserIcon from "../icon/UserIcon";
import { useAuth } from "./AuthProvider";

export default function BottomNavBar() {
  const { appUser } = useAuth();

  const getAccountLink = () => {
    if (!appUser) {
      return '/sign-in'
    } else if (!appUser.phone_number) {
      return '/sign-in/phone'
    }

    return '/account'
  }

  return (
    <>
      <nav className="absolute bottom-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-around bg-background shadow-t">
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          prefetch={false}
        >
          <HomeIcon />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link
          href="/orders"
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          prefetch={false}
        >
          <ShoppingBagIcon />
          <span className="text-xs font-medium">Orders</span>
        </Link>
        <Link
          href="/inbox"
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          prefetch={false}
        >
          <EnvelopeIcon />
          <span className="text-xs font-medium">Inbox</span>
        </Link>
        <Link
          href={getAccountLink()}
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          prefetch={false}
        >
          <UserIcon />
          <span className="text-xs font-medium">Account</span>
        </Link>
      </nav>
    </>
  )
}