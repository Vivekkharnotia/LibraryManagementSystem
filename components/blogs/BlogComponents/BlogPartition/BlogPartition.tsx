import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import styles from "./BlogPartition.module.css";
import { Dispatch, SetStateAction } from "react";
import { BlogCreateData, BlogEditData } from "types/blogs";

// the partition data only needs title and content
interface BlogPartitionData {
  title: string;
  content?: string;
}

interface BlogPartitionProps {
  anchorId: number;
  index: number;
  length: number;
  data: BlogPartitionData;
  setBlogData:
    | Dispatch<SetStateAction<(BlogCreateData | BlogEditData)[]>>
    | Dispatch<SetStateAction<BlogCreateData[]>>
    | Dispatch<SetStateAction<BlogEditData[]>>;
}

export default function BlogPartition({
  anchorId,
  data,
  index,
  length,
  setBlogData,
}: BlogPartitionProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = e.target.value;
    setBlogData((current: any) => {
      const newData = [...current];
      newData[index].title = title;
      return newData;
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setBlogData((current: any) => {
      const newData = [...current];
      newData[index].content = content;
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

  // up click will move the partition up
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

  return (
    <div className={styles.block} id={anchorId.toString()}>
      <div style={{ position: "relative" }}>
        <textarea
          className={styles.title}
          value={data.title}
          onChange={handleTitleChange}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = target.scrollHeight + "px";
          }}
        />
        <div className={styles.buttonGroup}>
          <IconButton onClick={handleUpClick}>
            <KeyboardArrowUpIcon color="primary" />
          </IconButton>

          <IconButton onClick={handleDownClick}>
            <KeyboardArrowDownIcon color="primary" />
          </IconButton>

          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      </div>
      <textarea
        className={styles.text}
        onChange={handleContentChange}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = target.scrollHeight + "px";
        }}
        value={data.content}
      />
    </div>
  );
}
