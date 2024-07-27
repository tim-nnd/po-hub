"use client";

import { createContext, useContext, useRef, useState } from "react";

const AlertContext = createContext<{
  alerts: any,
  setAlerts: any,
  showAlert: any
}>({
  alerts: null,
  setAlerts: null,
  showAlert: null
});

export function AlertProvider({ children }: any) {
  const [alerts, setAlerts] = useState<string[]>([]);
  const alertsRef = useRef(alerts);
  alertsRef.current = alerts;
  
  const showAlert = (message: string) => {
    if (alertsRef.current.includes(message)) return;
    setAlerts([...alertsRef.current, message])
    setTimeout(() => {
      setAlerts(alertsRef.current.filter(alert => alert != message));
    }, 1500)
  }

  return <AlertContext.Provider value={{alerts, setAlerts, showAlert}}>{children}</AlertContext.Provider>
}

export const useAlert = () => {
  return useContext(AlertContext);
}
