import { Link } from "react-router-dom";
import bg from "../../assets/background/nes.svg";

const Thankyou = () => {
  return (
    <div>
      <div className="flex flex-col py-10 items-center px-5 justify-center">
        <div>
          <div className="flex flex-col items-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-28 w-28 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-4xl pb-5 font-bold">Thank You !</h1>
            <p className="pb-5">
              Thank you for your interest! Check your email for a pdf to the
              guide.
            </p>
            <Link
              to="/"
              className="inline-flex items-center  rounded border
             border-primary bg-primary 
             px-4 py-2 text-white
              hover:bg-gray-500 focus:outline-none focus:ring"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="text-sm font-medium"> Home </span>
            </Link>
          </div>
        </div>
        <div className="py-10">
          <img src={bg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
