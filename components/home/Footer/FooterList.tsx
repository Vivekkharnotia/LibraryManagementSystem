import React from "react";

interface FooterListProps {
  title: string;
  links: FooterLink[];
}

interface FooterLink {
  name: string;
  link: string;
}

const FooterList = ({ title, links }: FooterListProps) => {
  return (
    <div className="flex flex-col gap-3 text-[#FFF] md:py-6 ml-10 md:ml-0">
      <h4 className="font-bold">{title}</h4>
      {links?.map((link) => (
        <p key={link.name} className="hover:text-[#aaa] cursor-pointer">
          {link.name}
        </p>
      ))}
    </div>
  );
};

export default FooterList;
