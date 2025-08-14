import React from "react";
import Container from "./../Container/Container";

const Refund = () => {
  return (
    <div>
      <Container>
        <div className="py-20 pt-32 font-nunito">
          <div className="bg-white text-black dark:bg-black dark:text-white">
            <div className="w-full flex justify-center">
              <h1
                className="lg:text-2xl  
            font-bold mb-4 text-black underline"
              >
                Return and Refund Policy
              </h1>
            </div>
            <br />
            <p className="my-4 text-[16px] text-justify">
              At Fashiony, we are committed to ensuring your satisfaction with
              our products. We accept returns for change of mind, provided you
              notify us within 24 hours of receiving your order. To be eligible
              for a return, the product must be in its original, unused, and
              resalable condition, with all tags attached.
            </p>
            <ul className="px-10 py-1 text-justify">
              <li className="list-disc">
                {" "}
                <p className="my-4 text-base">
                  If you encounter any issues with your product, please inform
                  us within 7 days of receipt. We will promptly send a
                  replacement, no questions asked.
                </p>
              </li>
              <li className="list-disc">
                <p className="my-4 text-base">
                  You may also exchange your product under the same conditions.
                </p>
              </li>
              <li className="list-disc">
                <p className="my-4 text-base">
                  For returns due to a fault on our part, Fashiony will cover
                  the return shipping costs. However, if the product is returned
                  without any defects, the customer will be responsible for the
                  return shipping charges.
                </p>
              </li>
              <li className="list-disc">
                <p className="my-4 text-base">
                  Refunds will be processed within 7 working days, provided the
                  returned product is received in perfect, undamaged condition.
                </p>
              </li>
              <li className="list-disc">
                <p className="my-4 text-base">
                  Please note that certain sensitive items, such as underwear &
                  undergarments products, are not eligible for returns.
                </p>
              </li>
              <li className="list-disc">
                <p className="my-4 text-base">
                  If you believe you have been harmed after using a product, we
                  are committed to providing compensation based on the damages,
                  provided you can supply reasonable evidence and justification.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Refund;
