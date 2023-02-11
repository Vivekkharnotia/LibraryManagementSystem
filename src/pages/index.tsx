import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Hero from "../../components/general/Hero"
import Footer from "../../components/general/Footer"
import SignIn from "../../components/general/SignIn/SignIn"
import Services from "../../components/general/Services/Services"

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <SignIn />
      <Footer />
    </>
  );
}
