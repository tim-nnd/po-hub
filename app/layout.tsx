import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/ui/AuthProvider";
import BottomNavBar from "@/components/ui/BottomNavBar";
import { AlertProvider } from "@/components/ui/AlertProvider";
import AlertContainer from "@/components/ui/AlertContainer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-[500px] relative mx-auto">
        <AuthProvider>
          <AlertProvider>
            {children}
            <BottomNavBar />
            <AlertContainer />
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
