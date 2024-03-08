"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PersistGate } from "redux-persist/integration/react";
import { Providers } from "../../redux/Providers";
import { persistor } from "../../redux/store";
import Header from "./components/Header";
import NewEmployeeModal from "./components/NewEmployeeModal";
import SideBar from "./components/SideBar";
import AccountModal from "./components/modals/AccountModal";
import PopUpAlert from "./components/modals/Alert";
import SuggestionModal from "./components/modals/SuggestionModal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sugg Box",
  description: "Your digital suggestion box",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <PersistGate persistor={persistor} loading={null}>
            <Header />
            <div className="flex items-start bg-gray-100">
              <SideBar />
              <main className="h-screen w-full overflow-y-scroll flex flex-col items-center">
                <div className="max-w-[1440px] w-full flex flex-col items-center">
                  {children}
                </div>
              </main>
            </div>

            {/* modals */}
            <AccountModal />
            <SuggestionModal />
            <PopUpAlert />
            <NewEmployeeModal />
          </PersistGate>
        </Providers>
      </body>
    </html>
  );
}
