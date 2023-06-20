import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Container, IconButton } from "@mui/material";
import style from "../../BlogCreator/VisitBlog.module.css";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { validFileType } from "utils/ExtendedUtils";

// BlogCreator - sends a file for image
interface BlogData {
  title: string;
  src?: File | undefined;
  content?: string | undefined;
}

// BlogEditor - sends a firebase storage url for image
interface BlogDataWithImage {
  title: string;
  src?: string;
  content?: string;
}

interface BlogImageProps {
  index: number;
  data: BlogData | BlogDataWithImage;
  length: number;
  setBlogData:
    | Dispatch<SetStateAction<(BlogData | BlogDataWithImage)[]>>
    | Dispatch<SetStateAction<BlogData[]>>
    | Dispatch<SetStateAction<BlogDataWithImage[]>>;
}

export default function BlogImage({
  setBlogData,
  index,
  data,
  length,
}: BlogImageProps) {
  const [src, setSrc] = useState<string>(
    typeof data.src === "string" ? data.src : URL?.createObjectURL(data.src!)
  );
  const blogImageRef = useRef<HTMLInputElement>(null);

  const handleUpClick = () => {
    if (length === 0) return;
    if (index === 0) return;
    setBlogData((current: any) => {
      const newData = [...current];
      const temp = newData[index];
      newData[index] = newData[index - 1];
      newData[index - 1] = temp;
      return newData;
    });
  };

  const handleDownClick = () => {
    if (length === 0) return;
    if (index === length - 1) return;
    setBlogData((current: any) => {
      const newData = [...current];
      const temp = newData[index];
      newData[index] = newData[index + 1];
      newData[index + 1] = temp;
      return newData;
    });
  };

  const handleDeleteClick = () => {
    setBlogData((current: any) => {
      const newData = [...current];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleEditClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change");
    if (!e?.target?.files) return;

    const file = e.target?.files[0];
    console.log(file);

    if (file) {
      if (!validFileType(file)) {
        alert("Invalid File Type");
      } else {
        const src = URL.createObjectURL(file);
        setSrc(src);
      }
    }

    setBlogData((current: any) => {
      const newData = [...current];
      // get the index of the image clicked
      newData[index].src = file;
      return newData;
    });
  };

  return (
    <>
      <div className={style.image1} style={{ marginBottom: "70px" }}>
        <div style={{ width: "min(25rem, 94vw)" }}>
          <img src={src} alt="" />
        </div>
        <IconButton className={style.editIcon}>
          <label
            htmlFor={`blog-image-${index}`}
            className="grid items-start cursor-pointer"
          >
            <input
              type="file"
              name=""
              id={`blog-image-${index}`}
              className={style.file}
              accept=".jpg, .jpeg, .png"
              hidden
              onChange={handleEditClick}
            />
            <EditIcon style={{ color: "white" }} />
          </label>
        </IconButton>

        <Container sx={{ resize: "none!important" }}>
          <IconButton onClick={handleUpClick}>
            <KeyboardArrowUpIcon color="primary" />
          </IconButton>

          <IconButton onClick={handleDownClick}>
            <KeyboardArrowDownIcon color="primary" />
          </IconButton>

          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon color="error" />
          </IconButton>
        </Container>
      </div>
    </>
  );
}
