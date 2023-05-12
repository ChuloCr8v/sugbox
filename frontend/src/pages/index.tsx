import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import HomePage from "../components/Home";
import { useSelector } from "react-redux";
import Login from "@/components/Login";
import SignUpMenuModal from "@/components/SignUpMenuModal";
import Signup from "@/components/Signup";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { loading } = useSelector((state: any) => state.loading);
  const { currentUser } = useSelector((state: any) => state.user);
  const { signUpForm } = useSelector((state: any) => state.form);
  const { loginForm } = useSelector((state: any) => state.form);
  const { manageOrgModal } = useSelector((state: any) => state.form);
  const { modal } = useSelector((state: any) => state.form);
  const { modalMsg } = useSelector((state: any) => state.form);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen w-screen">
        {currentUser && !currentUser.data.data.isAdmin && <HomePage />}
        {manageOrgModal && !currentUser && <SignUpMenuModal />}
        {loginForm && <Login />}
        {signUpForm && <Signup />}
        {loading && <Loading />}
      </main>
    </>
  );
}