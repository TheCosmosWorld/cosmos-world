import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content?: {
    title: string;
    body: string;
  } | null;
}

function Modal({ isOpen, onClose, content }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="flex justify-center items-center fixed bottom-0 top-0 left-0 right-0 z-[4]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 rounded-2xl bg-black-1 w-full max-w-[486px] h-fit relative overflow-hidden"
            >
              <button
                onClick={onClose}
                className="rounded bg-white-0.1 p-1 w-fit relative z-[1]"
              >
                <Image
                  src="/assets/svgs/x-mark.svg"
                  width={24}
                  height={24}
                  alt="Close"
                />
              </button>
              <div className="mt-6 relative z-[1]">
                <h2 className="text-[32px] leading-[38.4px] tracking-[2.5%] font-medium text-white uppercase">
                  {content?.title}
                </h2>
                <p className="text-xl leading-[24px] tracking-[2.5%] font-medium text-white-0.7 mt-6">
                  {content?.body}
                </p>
              </div>
              <div
                className="absolute top-0 animate-spin-slow z-0"
              >
                <Image
                  src="/assets/svgs/stars-bg.svg"
                  width={1440}
                  height={1037.19}
                  alt="Stars"
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="bg-black-0.1 backdrop-blur-modal fixed top-0 bottom-0 left-0 right-0 z-[2]"
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;
