import Hero from "../../components/general/Hero"
import Footer from "../../components/general/Footer"
import SignIn from "../../components/general/SignIn/SignIn"
import Services from "../../components/general/Services/Services"
import Main from "components/general/Main/Main";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Main /> */}
      <Services />
      <SignIn />
      <Footer />
    </>
  );
}
