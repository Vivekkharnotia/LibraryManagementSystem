import services from "./Services.module.css";
import Service from "./Service";

import secured from '../../public/secure.png';
import online_consultancy from '../../public/online_consultancy.png';
import easy_to_use from '../../public/easy.png';
import experts from '../../public/experts.png';
import video_illustrations from '../../public/video.png';
import blogs from '../../public/blogs.png';

function Services() {
    
    return(
  <>
    <div className={services.title}>Services</div>
    <div className={services.container}>
        <div className={services.row1}>
            <Service image={secured} name="Secured"/>
            <Service image={online_consultancy} name="Online Consultancy"/>
            <Service image={video_illustrations} name="Video Illustrations"/>
        </div>
        <div className={services.row2}>
            <Service image={blogs} name="Blogs"/>
            <Service image={experts} name="Experts"/>
            <Service image={easy_to_use} name="Easy to use"/>
        </div>


        <div className={services.row3}>
            <Service image={secured} name="Secured"/>
            <Service image={online_consultancy} name="Online Consultancy"/>
        </div>
        <div className={services.row4}>
            <Service image={video_illustrations} name="Video Illustrations"/>
            <Service image={blogs} name="Blogs"/>
        </div>
        <div className={services.row5}>
            <Service image={experts} name="Experts"/>
            <Service image={easy_to_use} name="Easy to use"/>
        </div>

        
    </div>
  </>);
}

export default Services;
