import Main from "components/home/Main/Main";
import Footer from "../../components/home/Footer/Footer";
import Hero from "../../components/home/Hero/Hero";
import Services from "../../components/home/Services/Services";
import SignIn from "../../components/signin/SignIn/SignInPage";

export default function Home({random}: {random: number}) {
  
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

export const getServerSideProps = async () => {
  const random = "ME";
  console.log(random)

  return {
    props: {
      random,
    },
  };
};