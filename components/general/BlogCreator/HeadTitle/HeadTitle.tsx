import { Avatar, Button, Input, Typography } from "@mui/material";
import style from "./HeadTitle.module.css";
import { Dispatch, SetStateAction, useEffect } from "react";
import { HeadTitleProps } from "../BlogCreator.interface";

function HeadTitle(props: HeadTitleProps) {
  const { headTitle, setHeadTitle, displayName, date } = props;

  return (
    <div className={style.head}>
      <Typography variant="h3" className={style.title}>
        <Input
          value={headTitle}
          sx={{
            height: "100%",
            width: "100%",
            fontWeight: "bolder",
            fontSize: "3rem",
            ">input": { textAlign: "center!important" },
          }}
          onChange={(e) => setHeadTitle(e.target.value)}
        ></Input>
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
        <Typography variant="body1">{`${date.toLocaleString("default", {
          month: "long",
        })} ${date.getDate()}, ${date.getFullYear()}`}</Typography>
      </div>
    </div>
  );
}

export default HeadTitle;
