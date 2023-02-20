import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const MobileNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center px-8 py-8 justify-between bg-[#fff] text-[#000] z-10">
        <h2 className="font-semibold text-[20px]">Reh-A</h2>
        <AiOutlineMenu
          className="text-[24px] cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
      </div>
      {showMenu && (
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
              <li
                className="hover:font-semibold text-[18px] cursor-pointer hover:bg-[#ccc] px-8 py-4"
                onClick={() => setShowMenu(false)}
              >
                Blogs
              </li>
              <li
                className="hover:font-semibold text-[18px] cursor-pointer hover:bg-[#ccc] px-8 py-4"
                onClick={() => setShowMenu(false)}
              >
                Slots
              </li>
              <li
                className="hover:font-semibold text-[18px] cursor-pointer hover:bg-[#ccc] px-8 py-4"
                onClick={() => setShowMenu(false)}
              >
                Contact
              </li>
              <li
                className="hover:font-semibold text-[18px] cursor-pointer hover:bg-[#ccc] px-8 py-4"
                onClick={() => setShowMenu(false)}
              >
                About
              </li>
              <li
                className="hover:font-semibold text-[18px] cursor-pointer hover:bg-[#ccc] px-8 py-4"
                onClick={() => setShowMenu(false)}
              >
                Sign in
              </li>
              <li
                className="hover:font-semibold text-[18px] cursor-pointer hover:bg-[#ccc] px-8 py-4"
                onClick={() => setShowMenu(false)}
              >
                Log in
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default MobileNavbar;
