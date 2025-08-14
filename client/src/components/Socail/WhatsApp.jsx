import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <>
      <div
        className="fixed bottom-10 right-5 z-40 bg-[#00E785]  p-4
       rounded-full cursor-pointer hover:scale-110 duration-300 shadow-inner "
      >
        <a
          href="https://wa.me/8801326755838"
          target="_blank"
          title="Chat with us on WhatsApp"
        >
          <FaWhatsapp className=" size-5 text-white" />
        </a>
      </div>
    </>
  );
};

export default Whatsapp;
