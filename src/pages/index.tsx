import Main from "components/home/Main/Main";
import Footer from "../../components/home/Footer/Footer";
import Hero from "../../components/home/Hero/Hero";
import Services from "../../components/home/Services/Services";
import SignIn from "../../components/signin/SignIn/SignInPage";

export default function Home() {
  
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
  const uid = "asflsadfj";
  console.log(uid)
  
  if(uid){
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
  else{
    return {
      props: {},
    };
  }
};