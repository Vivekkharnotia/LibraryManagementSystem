import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import style from "./VisitBlog.module.css";
import BlogPartition from "./BlogPartition/BlogPartition.js";
import Avatar from "@mui/material/Avatar";
import { Button, IconButton, Tooltip } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from '@mui/icons-material/Edit';
import Zoom from '@mui/material/Zoom';
import { useUser } from "components/UserContext";

export default function BlogCreator({ data }) {
  const container = useRef(null);
  const [titles, setTitles] = useState([]);
  const [tooltipTitle, setTooltipTitle] = useState("Edit Image");
  const blogImageInput = useRef(null);
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



  // hero image change
  useEffect(() => {
    const input = document.querySelector('#file');
    const preview = document.querySelector("#heroImage");
    input.addEventListener('change', updateImageDisplay);

    function updateImageDisplay() {
    
      const curFiles = input.files;
    
        for (const file of curFiles) {
          if (validFileType(file)) {
            setTooltipTitle(`${file.name} (${returnFileSize(file.size)})`)
            preview.children[0].children[0].src = URL.createObjectURL(file);
    
          } else {
            fileName.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
          }
    
        }
    }

    const fileTypes = [
      "image/jpeg",
      "image/png",
    ];
    
    function validFileType(file) {
      return fileTypes.includes(file.type);
    }
    function returnFileSize(number) {
      if (number < 1024) {
        return `${number} bytes`;
      } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
      } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
      }
    }
  })

  return (
    <>
      <div className={style.head}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bolder" }}
          className={style.title}
          contentEditable="true"
          suppressContentEditableWarning={true}
        >
          Click to Edit Title
        </Typography>
        <div className={style.author}>
          <Avatar
            className={style.authorAvatar}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQaD1mEh95w9y6o_8eVSErM9mnbbRQUiCgw&usqp=CAU"
            sx={{ backgroundColor: "#1565c0" }}
          ></Avatar>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Written By {displayName} &nbsp; &nbsp;
          </Typography>
          <Typography variant="body1">{`${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`}</Typography>
        </div>
      </div>

      {/* -----------------------hero image --------------------------------------*/}

      <div className={style.image1} id="heroImage">
        <div>
          <Tooltip title={tooltipTitle} TransitionComponent={Zoom}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaJKOnh70m9VVMzrgdZY0jTGUfLSXFI01IQ&usqp=CAU"
              alt=""
            />
          </Tooltip>
          <IconButton className={style.editIcon}>
                <label htmlFor="file" className={style.addImage}>
                    <input  type="file" name="" id="file" className={style.file} accept=".jpg, .jpeg, .png"/>
                    <EditIcon style={{color: 'white'}} />
                </label>
          </IconButton>
        </div>

      </div>







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
