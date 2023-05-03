import React, { useEffect, useRef, useState } from "react";
import style from "./VisitBlog.module.css";
import BlogPartition from "./BlogPartition/BlogPartition.js";
import { Button, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useUser } from "components/UserContext";
import HeroImage from "./HeroImage/HeroImage";
import HeadTitle from "./HeadTitle/HeadTitle";

export default function BlogCreator({ data }) {
  const [titles, setTitles] = useState([]);
  const container = useRef(null);
  const blogImageInput = useRef(null);
  const [headTitle, setHeadTitle] = useState('Click to Edit Title');
  const [heroImageSrc, setHeroImageSrc] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaJKOnh70m9VVMzrgdZY0jTGUfLSXFI01IQ&usqp=CAU");
  const user = useUser();
  const displayName = user.user? user.user.displayName : 'loading...';
  const date = new Date();


  const handleDeleteClick = (anchorId) => {
    console.log('block', block)
    block.map((item, index) => {
      // console.log(item.props.anchorId, anchorId)
      // item.props.anchorId === anchorId && block.splice(index, 1);
    });
  };

  const [block, setBlock] = useState([
    <BlogPartition key={`partition0`} anchorId="anchor0" handleDeleteClick={handleDeleteClick}/>,
  ]);



  useEffect(() => {
    const boldBtn = document.querySelector("#addBold");
    const italicBtn = document.querySelector("#addItalic");

    const handleBoldClick = () => {
      var range = window.getSelection().getRangeAt(0);

      let bold = document.createElement("b");

      bold.appendChild(range.extractContents());
      range.insertNode(bold);
    };

    const handleItalicClick = () => {
      var range = window.getSelection().getRangeAt(0);
      let italic = document.createElement("i");

      italic.appendChild(range.extractContents());
      range.insertNode(italic);
    };

    italicBtn.addEventListener("click", handleItalicClick);
    boldBtn.addEventListener("click", handleBoldClick);
  });

  useEffect(() => {
    const titles = block.map((item) => {
      if (item.type.name === "BlogImage") return 'image';
      return getTitle(item.props.anchorId);
    });

    setTitles(titles);
  }, [block]);

  const getTitle = (anchorId) => {
    const title = document.getElementById(`${anchorId}`);
    return title.children[0].innerText;
  };

  const handleParaClick = () => {
    const blockSize = block.length;
    setBlock((current) => [
      ...current,
      <BlogPartition
        key={`partition${blockSize}`}
        anchorId={`anchor${blockSize}`}
        handleDeleteClick={handleDeleteClick}
      />,
    ]);
  };

  const handleAddImageClick = () => {
    const blockSize = block.length;
    const file = blogImageInput.current.files[0];
    const src = URL.createObjectURL(file);
    setBlock((current) => [
      ...current,
      <BlogImage
        key={`image${blockSize}`}
        src={src}
      />,
    ]);
  };

  return (
    <>

      <HeadTitle displayName={displayName} date={date} headTitle={headTitle} setHeadTitle={setHeadTitle}/>
      <HeroImage heroImageSrc={heroImageSrc} setHeroImageSrc={setHeroImageSrc} />
      

      <div className={style.container}>
        <ul className={style.anchors} style={{ paddingLeft: "1.2rem" }}>
          {titles.map((item, index) => {
            if(item === 'image') return
            return (
              <li key={index}>
                <a href={"#" + block[index].props.anchorId}> ----{item} </a>
              </li>
            );
          })}
        </ul>
        <ul className={style.contact}>
          <li className={style.fb} onClick={handleParaClick}>
            <Button className={style.addPara}>P</Button>
          </li>
          <li className={style.fb} id="addBold">
            <Button>B</Button>
          </li>
          <li className={style.fb} id="addItalic">
            <Button>I</Button>
          </li>

          <li className={style.fb}>
            <Button>
              <label htmlFor="addImage" className={style.addImage}>
                  <input ref={blogImageInput} onChange={handleAddImageClick} type="file" name="" id="addImage" className={style.file} accept=".jpg, .jpeg, .png"/>
                  <AddPhotoAlternateIcon />
              </label>
            </Button>
          </li>
        </ul>

        <div className={style.content} ref={container}>
          {block}
        </div>
      </div>
    </>
  );
}

function BlogImage(src) {
  return (
    <>
      <div className={style.image1} style={{marginBottom: '70px'}}>
        <span style={{maxWidth: '30vw'}}>
          <img src={src.src} alt="" />
        </span>
        <IconButton className={style.editIcon}>
            <EditIcon />
        </IconButton>
      </div>
    </>
  );
}
