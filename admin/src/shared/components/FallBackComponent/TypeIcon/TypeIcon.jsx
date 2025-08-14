import React from "react";
import { FaAffiliatetheme, FaUsers } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { BiDetail } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaBangladeshiTakaSign, FaBlogger } from "react-icons/fa6";
import { SiFreelancer } from "react-icons/si";
import { HiOutlineChevronRight } from "react-icons/hi";
import { IoAddOutline } from "react-icons/io5";
import { CiExport } from "react-icons/ci";
import { FaShareAltSquare } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
const iconMap = {
  theme: FaAffiliatetheme,
  taka: FaBangladeshiTakaSign,
  bag: TbShoppingBagPlus,
  blog: FaBlogger,
  users: FaUsers,
  freelancer: SiFreelancer,
  rightarrow: HiOutlineChevronRight,
  details: BiDetail,
  addNew: IoAddOutline,
  edit: CiEdit,
  delete: MdDeleteForever,
  export: CiExport,
  home: IoHome,
  share: FaShareAltSquare,
  reset: GrPowerReset,
};

const TypeIcon = React.memo(({ type, className, size }) => {
  const IconComponent = iconMap[type];
  return IconComponent ? (
    <IconComponent className={className} size={size} />
  ) : null;
});

TypeIcon.displayName = "Icon";

export default TypeIcon;