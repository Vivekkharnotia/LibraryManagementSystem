import React from "react";
import styles from "./BlogPartition.module.css";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function BlogPartition({anchorId, handleDeleteClick}) {

 

  return (
    <div className={styles.block} id={anchorId}>
      <div className={styles.title} contentEditable='true' suppressContentEditableWarning={true}>
        Click to edit title
      </div>
      <div className={styles.text}>
        <p contentEditable='true' suppressContentEditableWarning={true}>
          Click to edit content
        </p>
      </div>

      <IconButton className={styles.deleteIcon} onClick={() => handleDeleteClick(anchorId)}>
        <DeleteIcon color="error" />
      </IconButton>
    </div>
  );
}
