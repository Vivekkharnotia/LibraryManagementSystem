import services from "./Services.module.css";
import Service from "./Service";

function Services() {
  return (
    <>
      <div className={services.title}>Services</div>
      <div className={services.container}>
        <div className={services.row1}>
          <Service image="/secured_icon.png" name="Secured" />
          <Service image="/online_consultancy_icon.png" name="Online Consultancy" />
          <Service image="/video_illus_icon.jpg" name="Video Illustrations" />
        </div>
        <div className={services.row2}>
          <Service image="/blog_icon.jpg" name="Blogs" />
          <Service image="/experts_icon.png" name="Experts" />
          <Service image="/easy_to_use_icon.jpg" name="Easy to use" />
        </div>

        <div className={services.row3}>
          <Service image="/secured_icon.png" name="Secured" />
          <Service image="/online_consultancy_icon.png" name="Online Consultancy" />
        </div>
        <div className={services.row4}>
          <Service image="/video_illus_icon.jpg" name="Video Illustrations" />
          <Service image="/blog_icon.jpg" name="Blogs" />
        </div>
        <div className={services.row5}>
          <Service image="/experts_icon.png" name="Experts" />
          <Service image="/easy_to_use_icon.jpg" name="Easy to use" />
        </div>
      </div>
    </>
  );
}

export default Services;
