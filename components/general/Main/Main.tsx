import Image from "next/image";
import trustGIF from "./../../../public/trust.gif";
import consultancyGIF from "./../../../public/consultancy.gif";
import videoGIF from "./../../../public/video.gif";
import {useVisibility} from "../../../utils/isVisible";
import Testimonial from "../Testimonial/Testimonial";

export default function Main() {
  var offset: number = 1040;
  
  const [isFirstSliceVisible, firstSlice] = useVisibility<HTMLDivElement>(650, 1);
  const [isSecondSliceVisible, secondSlice] = useVisibility<HTMLDivElement>(offset, 0);
  const [isThirdSliceVisible, thirdSlice] = useVisibility<HTMLDivElement>(710, 0);

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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere diam risus, non interdum tellus eleifend sed.
                  Fusce lacinia nisl eu hendrerit laoreet.
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
                <div className="content-hero-text">Quality and Trust!</div>
                <div className="content-info-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere diam risus, non interdum tellus eleifend sed.
                  Fusce lacinia nisl eu hendrerit laoreet.
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
                <div className="content-hero-text">Quality and Trust!</div>
                <div className="content-info-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere diam risus, non interdum tellus eleifend sed.
                  Fusce lacinia nisl eu hendrerit laoreet.
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
