import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar/Sidebar";

const AdminLayout = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/");
  
  // }, []);

  return (
    <div className="bg-gray-200">
  
        <div className="flex">
          <div className="w-[12%]">
            <Sidebar></Sidebar>
          </div>
          <div className="relative w-full  lg:w-[90%] h-screen overflow-auto px-5 ">
            {" "}
            <Outlet></Outlet>{" "}
          </div>
        </div>
 
    </div>
  );
};

export default AdminLayout;
