import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

// const CustomPrevArrow = ({ onClick }) => (
//   <MdOutlineKeyboardArrowLeft
//     className={`absolute top-1/2  transform -translate-y-1/2
//      left-10 text-2xl bg-gray-300 opacity-50 rounded-full
//       p-1 text-black cursor-pointer z-10 animate- move`}
//     onClick={onClick}
//     size={40}
//   />
// );

// const CustomNextArrow = ({ onClick }) => (
//   <MdKeyboardArrowRight
//     className={`absolute  top-1/2 transform
//      -translate-y-1/2 right-10 text-2xl bg-gray-300 hover:bg-primary hover:opacity-100 opacity-50
//       rounded-full p-1 text-black cursor-pointer z-10 animate- move `}
//     onClick={onClick}
//     size={40}
//   />
// );

// export { CustomPrevArrow, CustomNextArrow };

const CustomPrevArrow = ({ onClick }) => (
  <MdOutlineKeyboardArrowLeft
    className={`absolute top-1/2 transform -translate-y-1/2 
      left-10 text-2xl bg-gray-300 rounded-full p-1 text-black cursor-pointer 
      z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    onClick={onClick}
    size={40}
  />
);

const CustomNextArrow = ({ onClick }) => (
  <MdKeyboardArrowRight
    className={`absolute top-1/2 transform -translate-y-1/2 
      right-10 text-2xl bg-gray-300 rounded-full p-1 text-black cursor-pointer 
      z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    onClick={onClick}
    size={40}
  />
);
export { CustomPrevArrow, CustomNextArrow };
