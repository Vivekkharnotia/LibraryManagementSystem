import Main from "components/home/Main/Main";
import { NextApiRequest, NextApiResponse } from "next";
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

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  // const uid = getCookie("uid", { req, res });
  const uid = "asdf";
  if(uid){
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
};