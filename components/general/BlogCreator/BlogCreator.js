import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button } from "@mui/material";
import { useUser } from "components/UserContext";
import { useRef, useState } from "react";
import BlogImage from "./BlogImage/BlogImage";
import BlogPartition from './BlogPartition/BlogPartition';
import HeadTitle from "./HeadTitle/HeadTitle";
import HeroImage from "./HeroImage/HeroImage";
import style from "./VisitBlog.module.css";

export default function BlogCreator({ data }) {
  const [titles, setTitles] = useState([]);
  const container = useRef(null);
  const blogImageInput = useRef(null);
  const [headTitle, setHeadTitle] = useState("Click to Edit Title");
  const [heroImageSrc, setHeroImageSrc] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaJKOnh70m9VVMzrgdZY0jTGUfLSXFI01IQ&usqp=CAU"
  );
  const [blogData, setBlogData] = useState([]);
  const user = useUser();
  const displayName = user.user ? user.user.displayName : "loading...";
  const date = new Date();

  // useEffect(() => {
  //   const boldBtn = document.querySelector("#addBold");
  //   const italicBtn = document.querySelector("#addItalic");

  //   const handleBoldClick = () => {
  //     var range = window.getSelection().getRangeAt(0);

  //     let bold = document.createElement("b");

  //     bold.appendChild(range.extractContents());
  //     range.insertNode(bold);
  //   };

  //   const handleItalicClick = () => {
  //     var range = window.getSelection().getRangeAt(0);
  //     let italic = document.createElement("i");

  //     italic.appendChild(range.extractContents());
  //     range.insertNode(italic);
  //   };

  //   italicBtn.addEventListener("click", handleItalicClick);
  //   boldBtn.addEventListener("click", handleBoldClick);
  // });

  // useEffect(() => {
  //   const titles = block.map((item) => {
  //     if (item.type.name === "BlogImage") return 'image';
  //     return getTitle(item.props.anchorId);
  //   });

  //   setTitles(titles);
  // }, [block]);

  const getTitle = (anchorId) => {
    const title = document.getElementById(`${anchorId}`);
    return title.children[0].innerText;
  };

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



  

  return (
    <>
      <HeadTitle
        displayName={displayName}
        date={date}
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
          <li className={style.fb} id="addBold">
            <Button>B</Button>
          </li>
          <li className={style.fb} id="addItalic">
            <Button>I</Button>
          </li>

          <li
            className={style.fb}
            id="addItalic"
            onClick={() => console.log(blockTrial)}
          >
            <Button>T</Button>
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

          <Button onClick={()=>console.log(blogData)}>Check</Button>

        </div>
      </div>
    </>
  );
}
