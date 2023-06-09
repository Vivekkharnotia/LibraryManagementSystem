import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import { auth } from '../firebase-config';
import BlogsNav from './BlogsNav/BlogsNav';

function BlogsLayout(props: any) {

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  try{
    const user = auth.currentUser;
    user?.getIdTokenResult().then((idTokenResult) => {
      setIsAdmin(idTokenResult.claims.admin);
      setLoading(false);
    });
  }
  catch(err) {
    setLoading(false);
    console.log(err);
  }

  useEffect(() => {
    console.log("isAdmin: ", isAdmin);
    
  }, [isAdmin])


  return (
    loading ? <Loading message="Loading..." /> :
    <>
      <BlogsNav isAdmin={isAdmin}/>
      {props.children}
      <Footer />
    </>
  )
}

export default BlogsLayout
