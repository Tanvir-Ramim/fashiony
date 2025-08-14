import React from "react";
import Container from "./../../components/Container/Container";
import logo from "../../assets/logo/mainLogo.png";
const AboutUs = () => {
  return (
    <div className="py-20">
      <Container>
        {" "}
        <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
          <div className="w-full max-w- 7xl px-4 md:px-5 lg:px-5 mx- auto">
            <div className="flex-col justify-center items-center gap-4 flex">
              <h6 className="text-gray-400 text-base font-normal leading-relaxed">
                About Us
              </h6>
              <div className="w-full flex-col justify-center items-center gap-3 flex">
                <h2 className="text-indigo-700 text-xl lg:text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  Welcome To Fashiony
                </h2>
                <p className="text-gray-500 text-justify text-base font-normal leading-relaxed lg:text-start text-center">
                  Welcome to Fashiony, where elegance meets individuality. At
                  Fashiony, we believe that every woman deserves clothing that
                  reflects her unique style and grace. More than just a clothing
                  brand, Fashiony is a celebration of the modern woman. Our
                  collections seamlessly blend timeless designs with the latest
                  trends, offering quality craftsmanship and innovative styles
                  that empower you for every occasion. We are deeply committed
                  to sustainability and inclusivity, striving to make a positive
                  impact beyond fashion. Join us in celebrating your
                  individuality and expressing your personal story through our
                  thoughtfully designed pieces. .
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutUs;
