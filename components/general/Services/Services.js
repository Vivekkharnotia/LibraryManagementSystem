import services from "./Services.module.css";
import Service from "./Service";
import secured from '../../assests/secured_icon.png';
import online_consultancy from '../../assests/online_consultancy_icon.png';
import video_illustrations from '../../assests/video_illus_icon.jpg';
import blogs from '../../assests/blog_icon.jpg';
import experts from '../../assests/experts_icon.png';
import easy_to_use from '../../assests/easy_to_use_icon.jpg';

function Services() {
    // const secured = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrg9FD4YcNaiwtd8zNyuyuDnH5TsSv_8ZEnQ&usqp=CAU';
    // const online_consultancy = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDRwiCqihAnAj2Fu4_98E0h9ydmaXG0ZxK3w&usqp=CAU';
    // const video_illustrations = "data:image/jpeg;base64,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";
    // const blogs = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUV5wvWaxo7l2Mq7pYYcUzGFYNoAd8sKU4_Q&usqp=CAU';
    // const experts = 'data:image/png;base64,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';
    // const easy_to_use = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ878OvT2SYMy4E2XIp2yut4aqDeH1PZ4ILQ&usqp=CAU';
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
