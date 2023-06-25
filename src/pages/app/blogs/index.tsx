
const app = () => {

  // return <BlogsGrid data={data} />;
  return (
    <div>
      <h1>blogs</h1>
      <p>coming soon...</p>
    </div>
  )
};

export default app;

// export const getServerSideProps = async () => {
//   // get the latest 10 blogs from firestore
//   try{
//     console.log("fetching data")
//     const q = query(
//       collection(db, "metaBlogs"),
//       orderBy("date", "desc"),
//       where("published", "==", true),
//       limit(7)
//     );

//     const metaBlogs = await getDocs(q);
//     const metaBlogsData = metaBlogs.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//     }));
//     const metaBlogsDataString = JSON.stringify(metaBlogsData);
//     console.log(metaBlogsData);

//     return {
//       props: {
//         metaBlogsDataString,
//       },
//     };
//   }catch(e){
//     console.log("error: ", e);
//     return {
//       props: {
//         metaBlogsDataString: "[]",
//       },
//     };
//   }

// };
