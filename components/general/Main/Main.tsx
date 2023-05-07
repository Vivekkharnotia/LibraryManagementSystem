import Image from "next/image";
import trustGIF from "./../../../public/trust.gif";
import consultancyGIF from "./../../../public/consultancy.gif";
import videoGIF from "./../../../public/video.gif";
import { useVisibility } from "../../../utils/isVisible";
import Testimonial from "../Testimonial/Testimonial";
import useDevice from "utils/useDevice";
import { useEffect, useState } from "react";

export default function Main() {
  var offset: number = 1040;
  const isMobile = useDevice();
  const [specialOffset, setSpecialOffset] = useState(650);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setSpecialOffset(100);
    } else {
      setSpecialOffset(650);
    }
  }, [])

  // isMobile.isMobile ? specialOffset=100 : specialOffset=650;

  const [isFirstSliceVisible, firstSlice] = useVisibility<HTMLDivElement>(
    650,
    1
  );
  
  const [isSecondSliceVisible, secondSlice] = useVisibility<HTMLDivElement>(
    offset,
    0
  );
  const [isThirdSliceVisible, thirdSlice] = useVisibility<HTMLDivElement>(
    710,
    0
  );

  return (
    <>
      <main>
        <section className="slice-container">
          <div className="slice slice--image text-c">
            <span style={{ opacity: isFirstSliceVisible != true ? "0" : "1" }}>
              <Image src={trustGIF} alt="gif of trust and worthyness" />
            </span>
          </div>

          <div className="slice slice--content" ref={firstSlice}>
            <div className="content-container">
              <div className="content-text">
                <div className="content-hero-text">Quality and Trust!</div>
                <div className="content-info-text">
                  Quality and trust are the foundation of our online
                  physiotherapy services, and we are dedicated to helping you
                  achieve your health and wellness goals with confidence.
                </div>
              </div>

              <Testimonial />

              <div className="spacer"></div>
            </div>
          </div>
        </section>

        <section className="slice-container slice--inverted">
          <div className="slice slice--image slice--inverted-image text-c">
            <span style={{ opacity: isSecondSliceVisible != true ? "0" : "1" }}>
              <Image src={consultancyGIF} alt="gif of trust and worthyness" />
            </span>
          </div>

          <div className="slice" ref={secondSlice}>
            <div className="content-container">
              <div className="content-text">
                <div className="content-hero-text">Virtual Physiotherapy!</div>
                <div className="content-info-text">
                  With secure video consultations and messaging, our online
                  physiotherapy consultancy lets you connect with experienced
                  physiotherapists from home, saving you time and hassle.
                </div>
              </div>

              <Testimonial />

              <div className="spacer"></div>
            </div>
          </div>
        </section>

        <section className="slice-container">
          <div className="slice slice--image text-c">
            <span style={{ opacity: isThirdSliceVisible != true ? "0" : "1" }}>
              <Image src={videoGIF} alt="gif of trust and worthyness" />
            </span>
          </div>

          <div className="slice slice--content" ref={thirdSlice}>
            <div className="content-container">
              <div className="content-text">
                <div className="content-hero-text">Clear and Concise Videos!</div>
                <div className="content-info-text">
                  From injury prevention to post-operative rehabilitation, our
                  video illustrations provide the guidance you need to achieve
                  your physiotherapy goals.
                </div>
              </div>

              <Testimonial />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
