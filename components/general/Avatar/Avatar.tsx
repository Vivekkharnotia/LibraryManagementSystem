import { useRef, useState, useEffect, RefObject } from "react";
import styles from "./Avatar.module.css";
import arrow_down from "../../../public/arrow_down.svg";
import avatar from "../../../public/avatar.jpg";
import Image from "next/image";
import AvatarContainerClickHandler from "utils/outsideClickAlerter";

function Avatar() {
  return (
    <>
      <div className={styles.pop_up} id="popUp"></div>

      <div className={styles.container}>
        <div onClick={AvatarContainerClickHandler}>
          <div className={styles.down_arrow}>
            <Image src={arrow_down} alt="v" />
          </div>
          <div className={styles.profile_circle}>
            <Image src={avatar} alt="v" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Avatar;
