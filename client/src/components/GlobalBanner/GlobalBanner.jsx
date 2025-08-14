import Typography from "./../Typography/Typography";

const GlobalBanner = ({ children, img, title }) => {
  const titleName = title?.split("/");
  //  //console.log(titleName);
  return (
    <div>
      {img && (
        <div className="relative h-[30vh] lg:h-[45vh]">
          <img
            src={img}
            alt="Banner"
            loading="lazy"
            className="h-[30vh] w-full object-cover lg:h-[45vh]"
          ></img>
          <div className="bg-black/20 absolute inset-0"></div>
          <div className="absolute top-[50%] left-[50%] transform -translate-y-1/2 -translate-x-1/2">
            <Typography
              variant={"h3"}
              className={
                "text-white text-[30px] lg:text-[40px] font-helvetica font-bold capitalize"
              }
            >
              {titleName}
              {/* {children} */}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalBanner;
