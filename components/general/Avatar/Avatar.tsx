import { useRef, useState, useEffect, RefObject } from "react";
import styles from "./Avatar.module.css";
import arrow_down from "../../../public/arrow_down.svg";
import avatar from "../../../public/avatar.jpg";
import Image from "next/image";
import AvatarContainerClickHandler from "utils/outsideClickAlerter";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { auth } from "../firebase-config";

function Avatar() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogOutClick = async () => {
    try {
      await auth.signOut();
      
    } catch (e){
     console.log(e)
    } 
  };


  return (
    <>
      <div>
        <Button aria-describedby={id} onClick={handleClick}>
          <div className={styles.down_arrow}>
            <Image src={arrow_down} alt="v" />
          </div>
          <div
            className={styles.profile_circle}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "rgb(64, 64, 234)",
              overflow: "hidden",
              marginLeft: "10px",
            }}
          >
            <Image src={avatar} alt="v" />
          </div>
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          elevation={0}
        >
          <Box sx={{ px: 4,py: 3, border: "1px solid black", borderRadius: '4px' }}>
            <Button onClick={handleLogOutClick} variant="contained" disableElevation sx={{backgroundColor: "rgb(250 184 0)", ":hover": {backgroundColor: "rgb(233, 171, 2)"}}}>Logout</Button>
          </Box>
        </Popover>
      </div>
    </>
  );
}

export default Avatar;
