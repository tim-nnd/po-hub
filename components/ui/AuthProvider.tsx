"use client";

import { getAuth, User } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import nookies from 'nookies';
import { getFirebaseClientApp } from "@/lib/getFirebaseClientApp";
import useInterval from "@/hooks/useInterval";
import { IUser } from "@/model/User";
import axios from "axios";

const AuthContext = createContext<{ user: User | null, setUser: any, triggerUpdateUser: any, appUser: IUser | null, setAppUser: any }>({
  user: null,
  setUser: null,
  triggerUpdateUser: null,
  appUser: null,
  setAppUser: null
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<IUser | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);

  const triggerUpdateUser = () => {
    setUser({ ...user } as User);
  }

  useEffect(() => {
    getFirebaseClientApp();
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        setAppUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { path: '/' });
        const result: IUser = (await axios.get(`/api/users/me`)).data;
        setAppUser(result);
      }
    })
  }, []);

  useInterval(async () => {
    getFirebaseClientApp();
    const user = getAuth().currentUser;
    if (user) await user.getIdToken(!firstLoad);
    if (firstLoad) setFirstLoad(false)
  }, 10 * 60 * 1000);

  return (
    <AuthContext.Provider value={useMemo(() => ({ user, setUser, triggerUpdateUser, appUser, setAppUser }), [user, setUser, triggerUpdateUser, appUser, setAppUser])}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
};