import React from "react";
import MobileNavbar from "../MobileNavbar/MobileNavbar"
import useDevice from "../../../utils/useDevice";

const Navbar = () => {
  const { isMobile } = useDevice();

  return (
    <>
      {!isMobile ? (
        <div className="flex flex-row items-center px-16 py-8 justify-end">
          <ul className="flex flex-row gap-8">
            <li>Blogs</li>
            <li>Slots</li>
            <li>Contact</li>
            <li>About</li>
            <li>Sign in</li>
            <li>Log in</li>
          </ul>
        </div>
      ) : (
        <>
          <MobileNavbar />
        </>
      )}
    </>
  );
};

export default Navbar;
