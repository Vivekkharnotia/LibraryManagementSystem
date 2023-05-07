import { useRef, useState, useEffect, RefObject } from "react";
import styles from "./Avatar.module.css";
import arrow_down from "../../../public/arrow_down.svg";
import avatarImg from "../../../public/avatar.jpg";
import Image from "next/image";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { auth, db } from "../firebase-config";
import { useRouter } from "next/router";
import { useUser } from "components/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { CircularProgress } from "@material-ui/core";


function Avatar() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [avatar, setAvatar] = useState<string>("");
  const router = useRouter();
  const { user, userLoading } = useUser();



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
      if (window) {
        window.localStorage.setItem("loggedIn", "false");
      }
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const getProfileImage = async () => {
    if (userLoading === "loaded") {
      const docRef = doc(db, "Userdata", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data?.profileImageUrl) {
          setAvatar(data.profileImageUrl);
        }
      }
    }
  };

  useEffect(() => {
    // update avatar if it exists in the database
    const fetchProfile = async () => {
      await getProfileImage();
    };

    if(avatar === "") fetchProfile();
  }, [userLoading]);

  return (
    <>
      <div>
        <Button sx={{backgroundColor: 'transparent!important'}} aria-describedby={id} onClick={handleClick}>
          <div className={styles.down_arrow}>
            <Image src={arrow_down} alt="v" />
          </div>
          <div
            className={styles.profile_circle}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              overflow: "hidden",
              marginLeft: "10px",
            }}
          >
            {avatar ? (
              <img src={avatar} alt="Avatar" />
              ) : (
              <CircularProgress />
            )}
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
          <Box
            sx={{
              px: 4,
              py: 3,
              border: "1px solid black",
              borderRadius: "4px",
            }}
          >
            <Button
              onClick={handleLogOutClick}
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: "rgb(250 184 0)",
                ":hover": { backgroundColor: "rgb(233, 171, 2)" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Popover>
      </div>
    </>
  );
}

export default Avatar;

