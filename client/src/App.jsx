import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBottom from "./components/Socail/TopToBottom";
import SpeedDial from "./components/Socail/SpeedDial";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   const handleContextMenu = (event) => {
  //     event.preventDefault();
  //   };

  //   const handleKeyPress = (event) => {
  //     if (
  //       event.key === "F12" ||
  //       event.key === "F11" ||
  //       (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl + Shift + I
  //       (event.ctrlKey && event.key === "U") || // Ctrl + U
  //       (event.ctrlKey && event.key === "S") || // Ctrl + S (Save)
  //       (event.ctrlKey && event.key === "P") // Ctrl + P (Print)
  //     ) {
  //       event.preventDefault();
  //     }
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);

  return (
    <div className="overflow-hidden">
      <RouterProvider router={router} />
      <TopBottom />
      <SpeedDial />
      <ToastContainer />
    </div>
  );
}

export default App;
