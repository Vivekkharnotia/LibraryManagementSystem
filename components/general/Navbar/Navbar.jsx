import React from "react";
import MobileNavbar from "../MobileNavbar/MobileNavbar"
import useDevice from "../../../utils/useDevice";
import Link from "next/link";

const Navbar = () => {
  const { isMobile } = useDevice();

  return (
    <>
      {!isMobile ? (
        <div className="flex flex-row items-center px-16 py-8 justify-end absolute top-0 right-0">
          <ul className="flex flex-row gap-8">
            <li>Blogs</li>
            <li>Slots</li>
            <li>Contact</li>
            <li>About</li>
            <li>
              <Link href="/auth">Sign in</Link>
            </li>
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
