import styles from "./AppointmentHeroImage.module.css";
import heroImage from "../../../../public/appointmentHeroImage.svg";
import calenderGirl from "../../../../public/calenderGirl.svg";
import stars from "../../../../public/stars.png";
import Image from "next/image";

function AppointmentHeroImage() {
  return (
    <div className={styles.container}>
      {/* <Image src={heroImage} alt="Hero Image" /> */}
      <Image className={styles.stars} src={stars} alt="" />
      <Image
        className={styles.calender_girl}
        src={calenderGirl}
        alt="girl sitting on a calender"
      />
      <div className={styles.hero_background}>
        Make your schedules <span>with</span> <br /> our experts doctors
      </div>
    </div>
  );
}

export default AppointmentHeroImage;
