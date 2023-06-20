import Hero from "../../components/home/Hero/Hero";
import Footer from "../../components/home/Footer/Footer";
import SignIn from "../../components/signin/SignIn/SignInPage";
import Services from "../../components/home/Services/Services";
import Main from "components/home/Main/Main";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.localStorage.getItem("loggedIn") == "true" &&
      window.location.replace("/app");
  }, []);
  return (
    <>
      <Hero />
      <Main />
      <Services />
      <div style={{ marginTop: "8rem" }}>
        <SignIn />
      </div>
      <Footer />
    </>
  );
}
