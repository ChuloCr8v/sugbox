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

  console.log(auth);

  console.log(auth);

  useEffect(() => {
    !auth && router.push("/login");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <PersistGate persistor={persistor} loading={null}>
            <Header />
            <div className="bg-gray-100 flex items-center justify-center min-h-full">
              <SideBar />
              <main className="min-h-screen w-full max-w-7xl">{children}</main>
            </div>
            <AccountModal />

            {auth && (
              <>
                <SuggestionModal />
                <PopUpAlert />
                <NewEmployeeModal />
                <SuggestionModal />
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
