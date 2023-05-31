import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SaveIcon from '@mui/icons-material/Save';
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import { db } from "components/general/firebase-config";
import { collection, doc, writeBatch } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import BlogImage from "../BlogComponents/BlogImage/BlogImage";
import BlogPartition from '../BlogComponents/BlogPartition/BlogPartition';
import HeadTitle from "../BlogComponents/HeadTitle/HeadTitle";
import HeroImage from "../BlogComponents/HeroImage/HeroImage";
import style from "../BlogCreator/VisitBlog.module.css";


export default function BlogEditor(props) {
  const [titles, setTitles] = useState([]);
  const container = useRef(null);
  const blogImageInput = useRef(null);
  const [headTitle, setHeadTitle] = useState(props.metaBlogData.headTitle);
  const [heroImageSrc, setHeroImageSrc] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaJKOnh70m9VVMzrgdZY0jTGUfLSXFI01IQ&usqp=CAU"
  );
  const [blogData, setBlogData] = useState(props.blogData);
  const date = props.metaBlogData.date;
  const [loading, setLoading] = useState(false);
  const blogID = props.blogID;
  const displayName = props.metaBlogData.displayName;
  const [uid, setUid] = useState(null);

  useEffect(()=>{
    setUid(localStorage.getItem('uid'));
  }, [])

  // const getTitle = (anchorId) => {
  //   const title = document.getElementById(`${anchorId}`);
  //   return title.children[0].innerText;
  // };

  const handleParaClick = () => {
    setBlogData((current) => [
      ...current,
      { title: "Title", content: "Content" },
    ]);
  };

  const handleAddImageClick = () => {
    const file = blogImageInput.current.files[0];
    const src = URL.createObjectURL(file);

    setBlogData((current) => [
      ...current,
      { title: "Image", src: src },
    ]);
  };

  const handleSaveClick = async () => {
    const blog = {
      blogData: blogData,
      uid: uid,
    };

    const metaBlog = {
      displayName: displayName,
      date: date,
      headTitle: headTitle,
      heroImageSrc: heroImageSrc,
      uid: uid,
    }
    
    
    // write blog to firestore in batch
    const batch = writeBatch(db);

    const blogRef = doc(collection(db, "blogs"), blogID);
    const metaBlogRef = doc(collection(db, "metaBlogs"), blogID);

    batch.update(blogRef, blog);
    batch.update(metaBlogRef, metaBlog);
    setLoading(true);
    await batch.commit();
    setLoading(false);
  }
  

  return (
    <>
      <Backdrop open={loading} sx={{zIndex: 100, flexDirection: 'column', gap: 4, color: 'white'}}>
        <Typography fontSize={24}> Saving... </Typography>
        <CircularProgress  sx={{color: 'white'}} />
      </Backdrop>

      <HeadTitle
        displayName={displayName}
        date={new Date()}
        headTitle={headTitle}
        setHeadTitle={setHeadTitle}
      />
      <HeroImage
        heroImageSrc={heroImageSrc}
        setHeroImageSrc={setHeroImageSrc}
      />

      <div className={style.container}>
        <ul className={style.anchors} style={{ paddingLeft: "1.2rem" }}>
          {/* {titles.map((item, index) => {
            if(item === 'image') return
            return (
              <li key={index}>
                <a href={"#" + block[index].props.anchorId}> ----{item} </a>
              </li>
            );
          })} */}
        </ul>
        <ul className={style.contact}>
          <li className={style.fb} onClick={handleParaClick}>
            <Button className={style.addPara}>P</Button>
          </li>
          
          <li className={style.fb}>
            <Button sx={{ padding: "0" }}>
              <label htmlFor="addImage" className={style.addImage}>
                <input
                  ref={blogImageInput}
                  onClick={(e) => (e.target.value = null)}
                  onChange={handleAddImageClick}
                  type="file"
                  name="addImage"
                  id="addImage"
                  className={style.file}
                  accept=".jpg, .jpeg, .png"
                />
                <AddPhotoAlternateIcon />
              </label>
            </Button>
          </li>

          <li className={style.fb}>
            <Button className={style.addPara} onClick={handleSaveClick}>
              <SaveIcon />
            </Button>
          </li>

        </ul>

        <div className={style.content} ref={container}>
          {
            blogData.map((item, index) => {
              if(item.title === 'Image') return <BlogImage key={index} data={item} index={index} length={blogData.length} setBlogData={setBlogData}/>
              else
                return (
                  <BlogPartition key={index} data={item} index={index} length={blogData.length} setBlogData={setBlogData}/>
                );
            })
          }

          {/* <Button onClick={()=>console.log(metaBlogData)}>Check</Button> */}

        </div>
      </div>
    </>
  );
}
