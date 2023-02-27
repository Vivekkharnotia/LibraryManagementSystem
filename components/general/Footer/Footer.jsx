import React from "react";
import { TfiLinkedin, TfiFacebook, TfiTwitterAlt } from "react-icons/tfi";
import { FaArrowRight } from "react-icons/fa";

const FooterList = ({ title, links }) => {
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

const FooterIcon = ({ Icon }) => {
  return (
    <div className="rounded-full border-[1.5px] border-[#aaa] w-[35px] h-[35px] flex flex-row items-center justify-center hover:bg-[#fff] text-[#aaa] hover:border-[#fff] cursor-pointer">
      {Icon && <Icon />}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="pt-4 pb-8 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#1F1F1F] to-[#262626] absolute w-full">
      <div className="flex flex-col gap-10 w-full md:w-[95%] lg:w-[85%] m-auto">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-8 md:gap-4">
          <FooterList
            title="Product"
            links={[
              { name: "Employee Database", link: "" },
              { name: "Payroll", link: "" },
              { name: "Absences", link: "" },
              { name: "Time tracking", link: "" },
              { name: "Shift planner", link: "" },
              { name: "Recruiting", link: "" },
            ]}
          />
          <FooterList
            title="Information"
            links={[
              { name: "FAQ", link: "" },
              { name: "Blog", link: "" },
              { name: "Support", link: "" },
            ]}
          />
          <FooterList
            title="Company"
            links={[
              { name: "About us", link: "" },
              { name: "Careers", link: "" },
              { name: "Contact us", link: "" },
              { name: "Lift Media", link: "" },
            ]}
          />
          <div className="px-10 py-6 bg-[#333] md:max-w-[320px] mb-16">
            <h3 className="font-bold text-[#FFF] mb-4">Subscribe</h3>
            <div className="flex flex-row h-[50px] items-center rounded-[6px] mb-6">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 h-[50px] rounded-l-[6px] bg-[#FFF] outline-none pl-4 pr-2 text-[#333]"
              />
              <button className="bg-[#0081FE] h-[50px] w-[50px] flex items-center p-2 rounded-r-[6px] justify-center text-[#FFF]">
                <FaArrowRight />
              </button>
            </div>
            <span className="text-[12px] text-[#FFF]">
              Hello, we are Lift Media. Our goal is to translate the positive
              effects from revolutionizing how companies engage with their
              clients & their team.
            </span>
          </div>
        </div>
        <div className="h-[1px] bg-[#eee] border-none"></div>
        <div className="text-[#FFF] flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-row gap-10">
            <span className="hover:text-[#aaa] cursor-pointer">Terms</span>
            <span className="hover:text-[#aaa] cursor-pointer">Privacy</span>
            <span className="hover:text-[#aaa] cursor-pointer">Cookies</span>
          </div>
          <div className="flex flex-row gap-4">
            <FooterIcon Icon={() => <TfiLinkedin />} />
            <FooterIcon Icon={() => <TfiFacebook />} />
            <FooterIcon Icon={() => <TfiTwitterAlt />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
