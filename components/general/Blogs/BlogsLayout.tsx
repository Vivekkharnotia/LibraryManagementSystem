import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import { auth } from '../firebase-config';
import BlogsNav from './BlogsNav/BlogsNav';

function BlogsLayout(props: any) {

  const [isAdmin, setIsAdmin] = useState<boolean>(false);


  const getIsAdmin = ()=>{
    try{
      const user = auth.currentUser;
      user?.getIdTokenResult().then((idTokenResult) => {
        setIsAdmin(idTokenResult.claims.admin);
      });
    }
    catch(err) {
      console.log(err);
    }
  }

  

  useEffect(() => {
    getIsAdmin();
  }, [])


  return (
    <>
      <BlogsNav isAdmin={isAdmin}/>
      {props.children}
      <Footer />
    </>
  )
}

export default BlogsLayout



