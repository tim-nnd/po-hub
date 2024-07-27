"use client";

import Link from "next/link";
import HomeIcon from "../icon/HomeIcon";
import UserIcon from "../icon/UserIcon";
import { useAuth } from "./AuthProvider";
import { use, useEffect, useState } from "react";
import ClipboardIcon from "../icon/ClipboardIcon";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
  const { appUser, user } = useAuth();
  const [accountLink, setAccountLink] = useState("/sign-in");
  const pathname = usePathname();

  const [filled, setFilled] = useState({
    home: false,
    order: false,
    account: false
  });

  useEffect(() => {
    if (!appUser) {
      setAccountLink('/sign-in')
    } else if (!appUser.phone_number) {
      setAccountLink('/sign-in/phone')
    } else {
      setAccountLink('/account')
    }

  }, [appUser, user])

  useEffect(() => {
    console.log(pathname)
    setFilled({
      home: pathname === "/",
      order: pathname === "/order",
      account: pathname === "/account"
    });
  }, [pathname])

  return (
    <nav className="sticky bottom-0 z-50 flex h-14 max-w-[500px] items-center justify-around shadow-t">
      <Link
        href="/"
        className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        prefetch={false}
      >
        <HomeIcon filled={filled.home} />
        <span className="text-xs font-medium">Home</span>
      </Link>
      <Link
        href="/order"
        className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        prefetch={false}
      >
        <ClipboardIcon filled={filled.order} />
        <span className="text-xs font-medium">Orders</span>
      </Link>
      <Link
        href={accountLink}
        className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        prefetch={false}
      >
        <UserIcon filled={filled.account} />
        <span className="text-xs font-medium">Account</span>
      </Link>
    </nav>
  )
}