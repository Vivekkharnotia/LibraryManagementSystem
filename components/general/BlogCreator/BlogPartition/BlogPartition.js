import React from "react";
import styles from "./BlogPartition.module.css";

export default function BlogPartition({anchorId, setBold, temp}) {

  return (
    <div className={styles.block} id={anchorId}>
      <div className={styles.title} contentEditable="true">
        Click to edit title
      </div>
      <div className={styles.text}>
        <p onClick={()=>setBold(document.getElementById(anchorId).children[1].children[0])} contentEditable="true">
          Click to edit content
          {temp}
          &nbsp;<b contentEditable="true" className={styles.bold}>important</b>&nbsp;
        </p>
      </div>
    </div>
  );
}
