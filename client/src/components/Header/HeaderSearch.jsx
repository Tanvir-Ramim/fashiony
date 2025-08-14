import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { RiCloseCircleFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FaClockRotateLeft } from "react-icons/fa6";
import Api from "../../apiClient/ApiClient";

const HeaderSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [srPr, setPr] = useState([]);
  const [arr, setArr] = useState([]);
  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(1);
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const searchProduct = async (page, query) => {
    if (query === "") {
      return;
    }
    try {
      const res = await Api.get(
        `/products/search?query=${query}&limit=5&page=${page}`
      );
      setPr(res.data.data.suggestions);
      setPage(res.data.data.paginate.nextPage);
      setLimit(res.data.data.paginate.totalDocs);
      setTimeout(() => {
        setPr([]);
      }, 10000);
      setShow(false);
    } catch (error) {
      console.error(error);
      setShow(false);
    }
  };

  const handleNavigate = () => {
    setShow(false);
    setSearchValue("");
    navigate("/shop", { state: searchValue });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setArr(srPr); // use srPr for suggestions
    setShow(true);
  };

  const suggFun = (text) => {
    setSearchValue(text);
    searchProduct(1, text);
  };

  const delSuggList = (suggestion) => {
    const newarr = arr.filter((item) => item !== suggestion);
    setArr(newarr);
  };

  const handleViewProducts = (item) => {
    navigate(`${item.link.shop}/${item.title}`);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchValue]);

  useEffect(() => {
    if (debouncedValue) {
      searchProduct(1, debouncedValue); // Call searchProduct after debounce
    }
  }, [debouncedValue]);

  return (
    <div>
      <div className="flex bg-white justify-between border-[1px] border-gray-300 w-full rounded-full pl-2 overflow-hidden">
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => setShow(true)}
          className="w-[90%] outline-none p-1 placeholder:text-sm caret-gray-700 text-gray-400"
          placeholder="Search Here ..."
        />
        <div className="p-1">
          <button
            onClick={handleNavigate}
            className="bg-[#B9A36B] p-2 rounded-full text-white ont-bold"
          >
            <IoSearch className="md:h-5 md:w-5 h-3 w-3" />
          </button>
        </div>
      </div>
      {srPr.length > 0 ? (
        <div className="absolute w-[92%] z-50">
          <div onClick={() => setPr([])} className="flex justify-center">
            <RiCloseCircleFill className="text-red-600 text-xl cursor-pointer" />
          </div>
          <div
            className="relative h-72 overflow-y-auto 
           flex flex-col text-gray-700 bg-white shadow-md w-full rounded-t-lg bg-clip-border mt-1"
          >
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
              {srPr.map((item, i) => (
                <div
                  key={i}
                  role="button"
                  className="flex relative items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <div className="grid mr-4 place-items-center"></div>
                  <div>
                    <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                      {item.title}
                    </h6>
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                      {item.brand} @ {item.category}
                    </p>
                    {item.price && (
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                        {item.price}tk.
                      </p>
                    )}
                  </div>
                  <div className="flex w-72 justify-end gap-x-20 ">
                    <div onClick={() => handleViewProducts(item)}>
                      <GrView className="text-[#B9A36B] text-2xl " />
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>
          <button
            onClick={() => {
              searchProduct(page, searchValue);
            }}
            className="text-white bg-[#B9A36B] w-full p-1 rounded-b-lg h-8"
          >
            {limit > srPr.length
              ? `Showing ${srPr.length} of ${limit} products. Click here for more results!`
              : `Showing ${limit} products`}
          </button>
        </div>
      ) : (
        show && (
          <div className="absolute z-50 flex flex-col text-gray-700 bg-white shadow-md w-[92%] rounded-xl bg-clip-border">
            {arr
              .slice()
              .reverse()
              .map((suggestion, index) => (
                <nav
                  key={index}
                  className="flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700"
                >
                  <div
                    onClick={() => suggFun(suggestion)}
                    role="button"
                    className="flex items-center text-sm w-full p-1 leading-tight transition-all rounded-lg outline-none bg-gray-50/50 text-start text-gray-700 hover:bg-gray-300 hover:bg-opacity-80 hover:text-blue-900 focus:bg-gray-50 focus:bg-opacity-80 focus:text-gray-900 active:bg-gray-50 active:bg-opacity-80 active:text-blue-500"
                  >
                    <p className="flex gap-2 items-center">
                      <FaClockRotateLeft />
                      <span>{suggestion}</span>
                    </p>
                  </div>
                  <div className="grid ml-auto place-items-center justify-self-end absolute right-4 text-red-400">
                    <button
                      onClick={() => delSuggList(suggestion)}
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 -mt-2 left-1/2">
                        <RxCross2 className="text-base" />
                      </span>
                    </button>
                  </div>
                </nav>
              ))}
          </div>
        )
      )}
    </div>
  );
};

export default HeaderSearch;
