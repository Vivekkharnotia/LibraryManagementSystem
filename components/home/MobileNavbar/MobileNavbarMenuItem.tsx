import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface MobileNavbarMenuItemProps {
  link: string;
  title: string;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  scroll?: boolean;
  className?: string;
}

const MobileNavbarMenuItem = ({
  link,
  title,
  setShowMenu,
  scroll = true,
  className = "",
}: MobileNavbarMenuItemProps) => {
  return (
    <Link href={link} scroll={scroll}>
      <li
        className={`${className}`}
        onClick={() => setShowMenu(false)}
      >
        {title}
      </li>
    </Link>
  );
};

export default MobileNavbarMenuItem;
