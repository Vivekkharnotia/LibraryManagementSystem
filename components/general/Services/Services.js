import services from "./Services.module.css";
import Service from "./Service";

// import secured from "../../public/secure.png";
// import online_consultancy from "../../public/online_consultancy.png";
// import easy_to_use from "../../public/easy.png";
// import experts from "../../public/experts.png";
// import video_illustrations from "../../public/video.png";
// import blogs from "../../public/blogs.png";

function Services() {
  return (
    <>
      <div className={services.container}>
      <div className={services.title}>Services</div>
        <div className={services.grid}>
          <Service image="/secure.png" name="Secured" />
          <Service image="/online_consultancy.png" name="Online&nbsp;Consultancy" />
          <Service image="/video.png" name="Video&nbsp;Illustrations" />
          <Service image="/blogs.png" name="Blogs" />
          <Service image="/experts.png" name="&nbsp;&nbsp;&nbsp;Experts" />
          <Service image="/easy.png" name="Easy&nbsp;to&nbsp;use" />
        </div>
      </div>
    </>
  );
}

export default Services;
