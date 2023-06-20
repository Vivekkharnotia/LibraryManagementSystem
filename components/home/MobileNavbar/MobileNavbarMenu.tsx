import React, { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import MobileNavbarMenuItem from "./MobileNavbarMenuItem";
import { mobileNavbarMenuItems } from "./constants/mobileNavbarMenuItems";
import { menuItem } from "./variants/menuItem";

interface MobileNavbarMenuProps {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

const MobileNavbarMenu = ({ setShowMenu }: MobileNavbarMenuProps) => {
  return (
    <>
      <div
        className="fixed bg-[#000] opacity-60 top-0 right-0 left-0 bottom-0 w-full z-20"
        onClick={() => setShowMenu(false)}
      ></div>
      <div
        className={`flex flex-col fixed top-0 transition ease-in-out h-[100vh] duration-3000 bg-[#FFF] text-[#000] z-50 w-[65%]`}
      >
        <div className="flex flex-row items-center px-8 py-8 justify-between bg-[#fff] text-[#000]">
          <h2 className="font-semibold text-[20px]">Reh-A</h2>
          <AiOutlineClose
            className="text-[24px] cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>
        <ul className="flex flex-col">
          {mobileNavbarMenuItems.map((item, index) => (
            <MobileNavbarMenuItem
              key={index}
              title={item.title}
              link={item.link}
              setShowMenu={setShowMenu}
              scroll={item.scroll}
              className={menuItem({ color: item.variant })}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileNavbarMenu;
