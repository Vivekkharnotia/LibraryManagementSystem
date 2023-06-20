import React from "react";

interface FooterIconProps {
  Icon: React.ElementType;
}

const FooterIcon = ({ Icon }: FooterIconProps) => {
  return (
    <div className="rounded-full border-[1.5px] border-[#aaa] w-[35px] h-[35px] flex flex-row items-center justify-center hover:bg-[#fff] text-[#aaa] hover:border-[#fff] cursor-pointer">
      {Icon && <Icon />}
    </div>
  );
};

export default FooterIcon;
