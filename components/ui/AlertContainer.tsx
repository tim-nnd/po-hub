"use client";

import { useAlert } from "./AlertProvider";

function AlertItem({ message }: any) {
  return (
    <div className="alert mx-4 my-2 rounded-xl max-w-xs p-4 text-sm font-semibold animate-rise">
      {message}
    </div>
  )
}

export default function AlertContainer() {
  const { alerts } = useAlert();
  return (
    <div>
      <div className="w-full z-20 fixed bottom-20 left-0 text-center flex flex-col items-center">
        {alerts.map((alert: any, i: number) => (
          <AlertItem key={i} message={alert}/>
        ))}
      </div>
    </div>
  )
}