import React from "react";

import DetailButton from "./DetailButton";

import Container from "../Container/Container";

const Description = ({
  activeSection,
  setActiveSection,
  description,
  feature,
}) => {
  return (
    <div id="details-section" className="description">
      {description && (
        <Container>
          <div className="p-5 bg-white drop-shadow-md">
            <div className="flex gap-2">
              {/* <DetailButton
              title="specification"
              onClick={() => setActiveSection("specification")}
              className={`${
                activeSection === "specification"
                  ? `bg-primary text-white`
                  : `bg-[#f9fafc]`
              }`}
            /> */}
              <DetailButton
                title="description"
                onClick={() => setActiveSection("description")}
                className={`${
                  activeSection === "description"
                    ? `bg-primary text-white`
                    : `bg-[#f9fafc]`
                }`}
              />
            </div>
            {activeSection === "specification" && (
              <div className="description_contents">
                {/* <DescriptionHeader title="specification" /> */}
                <div className="w-full py-2">
                  {feature?.map((info, i) => (
                    <div key={i} className="">
                      <ul className="grid grid-cols-2 border hover:bg-[#EEEEEE] duration-500">
                        <li className="border-l p-2 text-black text-base font-Monteserat font-medium capitalize  text-left">
                          {info?.key}
                        </li>
                        <li className="border-l p-2 text-black text-base font-Monteserat font-medium capitalize  text-left">
                          {info?.value}
                        </li>
                      </ul>
                      {/* <div className="description_title w-1/3 border hover:bg-[#EEEEEE] duration-500">
                      <p className="p-2 text-black text-base font-Monteserat font-medium capitalize  text-left">
                        {info?.key}
                      </p>
                    </div>
                    <div className="description_item w-1/2 border hover:bg-[#EEEEEE] duration-500">
                      <p className="p-2 text-black text-base font-Monteserat font-medium capitalize text-left">
                        {info?.value}
                      </p>
                    </div> */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "description" && (
              <div className="description_contents">
                {/* <DescriptionHeader title="description" /> */}
                <div className="w-full py-10">
                  <div
                    className="md:mb-4 text-black"
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  ></div>
                  {/* <div className=" my-5 hover:bg-[#EEEEEE] duration-500">
                  <p className="p-2 text-ash text-base font-Monteserat font-medium capitalize w-fit text-left">
                    <span className=" font-bold">
                      {description?.split(".")[0]}.
                    </span>
                    <br />
                    {description
                      ?.split(".")
                      ?.map((item, i) => i != 0 && <span>{item}</span>)}
                  </p>
                </div> */}
                </div>
              </div>
            )}
          </div>
        </Container>
      )}
    </div>
  );
};

export default Description;
