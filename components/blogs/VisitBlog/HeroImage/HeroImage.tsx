import Image from "next/image";

export default function HeroImage({ heroImageSrc }: { heroImageSrc: string }) {
  return (
    <div
      className="mt-[40px] md:mt-[70px] relative m-auto overflow-auto w-[90%] h-[260px] sm:max-w-[900px] sm:h-[350px] md:h-[450px] lg:h-[600px] px-4"
      id="heroImage"
    >
      <Image
        src={heroImageSrc}
        fill={true}
        alt="Blog Cover Image"
        className="object-cover cursor-pointer rounded-[10px]"

      />
    </div>
  );
}
