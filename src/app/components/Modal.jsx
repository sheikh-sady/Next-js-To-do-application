"use client";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      {/* Backdrop */}
      {/* <div
        className="absolute inset-0 bg-black/30 "
        onClick={onClose} // click outside to close
      ></div> */}

      {/* Modal content */}
      <div
        className="relative z-10 bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {children}
      </div>
    </div>
  );
}
