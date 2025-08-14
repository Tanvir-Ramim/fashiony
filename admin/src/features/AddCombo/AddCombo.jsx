import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import { getProducts } from "./ApiServices";
import ComboTable from "./ComboTable";
const AddCombo = () => {
  //for choice 1
  const [loading1, setLoading1] = useState(false);
  const [page1, setPage1] = useState(1);
  const [pageInfo1, setPageInfo1] = useState({});
  const [choice1, setChoice1] = useState([]);
   const [flag,setFlag]=useState(false)
  useEffect(() => {
    if (loading1) return;
    setLoading1(true);
    getProducts(setChoice1, "Choice1", true, 6, page1, setPageInfo1).then(() =>
      setLoading1(false)
    );
  }, [page1,flag]);
  console.log(pageInfo1);
  //for choice 2
  const [loading2, setLoading2] = useState(false);
  const [page2, setPage2] = useState(1);
  const [pageInfo2, setPageInfo2] = useState({});
  const [choice2, setChoice2] = useState([]);
  useEffect(() => {
    if (loading2) return;
    setLoading2(true);
    getProducts(setChoice2, "Choice2", true, 6, page2, setPageInfo2).then(() =>
      setLoading2(false)
    );
  }, [page2,flag]);

  console.log({ choice1 });
  console.log({ choice2 });

  return (
    <div
      className=" py-10   w-full 
    mx- auto ps-28 lg:ps-10 "
    >
      <h3 className="mb-5 text-xl font-extrabold text-center uppercase md:text-4xl text-primary ">
        Add Product
      </h3>
      <div className="pt-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="">
            <Link to={"/adminAddProducts"} state="choice1">
              <div className="border border-black w-80 h-72 cursor-pointer flex flex-col justify-center items-center rounded">
                <div className="bg-black w-7 h-7 mb-2 mx-auto flex justify-center items-center rounded-full text-white">
                  <GoPlus size={25} />
                </div>
                <h5>{`Add Your  Combo 1`}</h5>
              </div>
            </Link>
          </div>

          <div className="py-1 borer border-red-400 flex justify-center items-center">
            <GoPlus size={35} />
          </div>
          <Link to={"/adminAddProducts"} state="choice2">
            <div className="">
              <div className="border border-black w-80 h-72 cursor-pointer flex flex-col justify-center items-center rounded">
                <div className="bg-black w-7 h-7 mb-2 mx-auto flex justify-center items-center rounded-full text-white">
                  <GoPlus size={25} />
                </div>
                <h5>{`Add Your  Combo 2`}</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="pt-10">
        <h1 className="py-8 text-center font-semibold text-2xl">
          Choose One List
        </h1>
        <ComboTable setFlag={setFlag} products={choice1}></ComboTable>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage1((prev) => Math.max(prev - 1, 1))}
            disabled={!pageInfo1.hasPrevPage} 
            className={`${
              pageInfo1.hasPrevPage
                ? "bg-primary cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } text-white py-1 px-3 text-sm rounded-md`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage1((prev) => prev + 1)}
            disabled={!pageInfo1.hasNextPage} 
            className={`${
              pageInfo1.hasNextPage
                ? "bg-primary cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } text-white py-1 px-3 text-sm rounded-md`}
          >
            Next
          </button>
        </div>
      </div>
      <div className="pt-10">
        <h1 className="py-8 text-center font-semibold text-2xl">
          Combo 2 List
        </h1>
        <ComboTable setFlag={setFlag} products={choice2}></ComboTable>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage2((prev) => Math.max(prev - 1, 1))}
            disabled={!pageInfo2?.hasPrevPage} 
            className={`${
              pageInfo2?.hasPrevPage
                ? "bg-primary cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } text-white py-1 text-sm px-3 rounded-md`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage2((prev) => prev + 1)}
            disabled={!pageInfo2?.hasNextPage} 
            className={`${
              pageInfo2?.hasNextPage
                ? "bg-primary cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } text-white py-1 px-3 text-sm rounded-md`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCombo;
