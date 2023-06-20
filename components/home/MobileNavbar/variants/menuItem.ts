import { tv } from "tailwind-variants";

export const menuItem = tv({
  base: "hover:font-semibold text-[18px] cursor-pointer px-8 py-4",
  variants: {
    color: {
      main: "hover:bg-[#0081FE] hover:text-white",
      normal: "hover:bg-[#ccc]",
    },
  },
});