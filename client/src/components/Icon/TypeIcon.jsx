import React from "react";
import PropTypes from "prop-types";
import { CiCircleInfo } from "react-icons/ci";
import { FaStar, FaShoppingBasket } from "react-icons/fa";
import { FaCheck, FaCircleCheck } from "react-icons/fa6";
import { IoMdInformationCircle, IoMdAdd } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import {
  MdKeyboardArrowDown,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import {
  IoIosArrowRoundForward,
  IoIosArrowRoundBack,
  IoIosArrowRoundDown,
} from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";
import { FiChevronsRight } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { TbLetterX } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbRulerMeasure } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { CgNotes } from "react-icons/cg";
import { LuPlayCircle } from "react-icons/lu";
import { RiBookLine } from "react-icons/ri";
import { FaMapLocation } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { HiArrowSmRight } from "react-icons/hi";

const iconMap = {
  info: CiCircleInfo,
  check: FaCircleCheck,
  information: IoMdInformationCircle,
  star: FaStar,
  wishlist: CiHeart,
  cart: FaShoppingBasket,
  arrowDown: MdKeyboardArrowDown,
  checkmark: FaCheck,
  add: IoMdAdd,
  minus: FiMinus,
  email: MdEmail,
  location: IoLocationSharp,
  right: HiArrowSmRight,
  rightarrow: FiChevronsRight,
  arrowRightDouble: MdKeyboardDoubleArrowRight,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  // location: CiLocationOn,
  phone: MdOutlinePhoneInTalk,
  mail: CiMail,
  LetterX: TbLetterX,
  user: HiOutlineUserGroup,
  barrowForward: IoIosArrowRoundForward,
  barrowBack: IoIosArrowRoundBack,
  barrowDown: IoIosArrowRoundDown,
  measure: TbRulerMeasure,
  calendar: FaRegCalendarAlt,
  Image: CiImageOn,
  document: HiOutlineDocumentText,
  note: CgNotes,
  play: LuPlayCircle,
  book: RiBookLine,
  TbNotes: TbNotes,
  map: FaMapLocation,
  customer: RiCustomerService2Line,
  home: FaHome,
  rarrow: MdOutlineKeyboardArrowRight,
  leftarrow: MdKeyboardArrowLeft,
  taka: TbCurrencyTaka,
};

const TypeIcon = React.memo(({ type, className, size }) => {
  const IconComponent = iconMap[type];
  return (
    <>
      {IconComponent ? (
        <IconComponent className={className} size={size} />
      ) : null}
    </>
  );
});

TypeIcon.displayName = "Icon";

TypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
};

export default TypeIcon;
