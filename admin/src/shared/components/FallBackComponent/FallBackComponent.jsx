import { ErrorBoundary } from "react-error-boundary";

import { Link } from "react-router-dom";
function FallbackComponent({ error, resetErrorBoundary }) {
  
  return (
    <div className="flex items-center justify-center w-screen h-screen text-center bg-primary text-light">
      <div className="grid w-5/6 grid-cols-2 gap-10">
        <img src={Error} alt="error" className="mx-auto h-96 w-96 " />
        <div className="flex items-center justify-center capitalize">
          <div>
            <p className="text-4xl font-extrabold uppercase text-secondary ">
              Something went wrong
            </p>
            <p className="text-xs font-normal text-tertiary ">
              {error.message}
            </p>
            <Link to={"/"}>
              <button className="px-5 py-1 mt-5 text-xl font-semibold uppercase rounded-full bg-light text-primary">
                Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FallbackComponent;
