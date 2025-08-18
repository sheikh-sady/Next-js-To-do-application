"use client";
import { useEffect } from "react";

const ModalComponent = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed flex justify-center items-center inset-0 w-screen h-screen backdrop-blur-2xl z-50 overflow-hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex-1 relative z-10 max-w-110 p-4 rounded-lg shadow-xl bg-white"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default ModalComponent;
