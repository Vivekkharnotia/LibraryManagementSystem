import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MobileNavbarMenu from "./MobileNavbarMenu";

const MobileNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="block md:hidden">
      <div className="flex flex-row items-center px-8 py-8 justify-between bg-[#fff] text-[#000] z-10">
        <h2 className="font-semibold text-[20px]">Reh-A</h2>
        <AiOutlineMenu
          className="text-[24px] cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
      </div>
      {showMenu && <MobileNavbarMenu setShowMenu={setShowMenu} />}
    </div>
  );
};

export default MobileNavbar;
