"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PersistGate } from "redux-persist/integration/react";
import { Providers } from "../../redux/Providers";
import { persistor } from "../../redux/store";
import "./globals.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import AccountModal from "./components/modals/AccountModal";
import PopUpAlert from "./components/modals/Alert";
import SuggestionModal from "./components/modals/SuggestionModal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NewEmployeeModal from "./components/NewEmployeeModal";

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
  const router = useRouter();
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    !auth && router.push("/login");
  }, []);

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
            <AccountModal />
            {auth && (
              <>
                <SuggestionModal />
                <PopUpAlert />
                <NewEmployeeModal />
              </>
            )}
          </PersistGate>
        </Providers>
      </body>
    </html>
  );
}

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Providers>
//           <PersistGate persistor={persistor} loading={null}>
//             <Header />
//             <div className="flex items-start">
//               <SideBar />
//               <div className="py-[96px] px-6 h-screen w-full">{children}</div>
//             </div>
//             <AccountModal />
//             <PopUpAlert />
//             {/* <NewEmployeeModal /> */}
//           </PersistGate>
//         </Providers>
//       </body>
//     </html>
//   );
// }
