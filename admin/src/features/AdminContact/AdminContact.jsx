import { useEffect, useState } from "react";
import Api from "../../shared/Axios/axios";

const AdminContact = () => {
  const [info, setInfo] = useState({
    contact: "",
    email: "",
    map: "",
    address: "",
  });
  const [con, setCon] = useState({});
  //handle cahnge
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const formattedValue =
      value === "true" ? true : value === "false" ? false : value;
    setInfo((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };
  // handleupdate
  const getCon = async () => {
    try {
      const res = await Api.get(`/contact?query=66ceb292174d191de8ad7a7d}`);
      //console.log(res)
      setCon(res.data.data);

      setInfo({
        contact: "",
        email: "",
        map: "",
        address: "",
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  // handleupdate
  const handleEditad = async () => {
    try {
      const res = await Api.patch(
        `/contact/${"66ceb292174d191de8ad7a7d"}`,
        info
      );
      alert(res.data.message);

      setInfo({
        contact: "",
        email: "",
        map: "",
        address: "",
      });
      getCon();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getCon();
  }, []);

  return (
    <>
      <div className="  w-full h-screen ps-24">
        <div className="w-full max-w-lg pt-20">
          <h2 className="text-2xl font-bold text-center underline  pb-10  text-primary capitalize ">
            Contact information
          </h2>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <table className=" w-full">
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-none">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Google Map:
                    </label>
                  </td>
                  <td className="px-4 py-2 border-none">
                    <input
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="map"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-none">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      phone:
                    </label>
                  </td>
                  <td className="px-4 py-2 border-none">
                    <input
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="phone"
                      name="contact"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-none">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      email:
                    </label>
                  </td>
                  <td className="px-4 py-2 border-none">
                    <input
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="email"
                      name="email"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2 border-none">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      address:
                    </label>
                  </td>
                  <td className="px-4 py-2 border-none">
                    <input
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="address"
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan="2" className="px-4 py-2 border-none">
                    <button
                      onClick={handleEditad}
                      className="bg-primary hover:bg-lightash text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                    >
                      Submit
                    </button>
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* -------------existing user information list starts--------- */}
        <div className="user_info max-w-lg  pt-10">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl  text-ash font-Monteserat font-semibold">
              Address: {con?.address}
            </h2>
            <p className="text-base font-normal py-2 font-Monteserat text-">
              Email: {con?.email}
            </p>
            <p className="text-base font-normal font-Monteserat text- capitalize ">
              {" "}
              Contact: {con?.contact}
            </p>
          </div>
        </div>
        {/* -------------existing user information list starts--------- */}
      </div>
    </>
  );
};

export default AdminContact;
