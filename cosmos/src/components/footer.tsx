import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "./modal";

interface ModalContent {
  title: string;
  body: string;
}

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>();

  const handleAboutUsModal = () => {
    setModalContent({
      title: "about us",
      body: "Discover Cosmos' ground-breaking combination of blockchain technology with celestial artwork, where each transaction gives a virtual solar system life. We at Cosmos have developed a novel neural network that converts blockchain activity into captivating astronomical motions.",
    });
    setIsOpen(true);
  };

  const handleHowItWorksModal = () => {
    setModalContent({
      title: "how it works",
      body: "The planets' elegant dance is orchestrated by the proprietary neural network, which analyzes blockchain data to produce dynamic orbital patterns. Our solar system model moves in real time whenever $Cosmos is traded. Our neural network determines the orbital path of the planets as transactions travel over the blockchain. Thus, the universe is actually being moved by your transactions.",
    });
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <footer className="flex p-10 w-full justify-between items-center">
        <div className="flex gap-2 w-full">
          <button
            onClick={handleAboutUsModal}
            className="rounded-[100px] bg-white-0.1 backdrop-blur-footer-link font-semibold text-white uppercase tracking-[2.5%] text-xl leading-5 p-3 w-full max-w-[157px]"
          >
            About Us
          </button>
          <button
            onClick={handleHowItWorksModal}
            className="rounded-[100px] bg-white-0.1 backdrop-blur-footer-link font-semibold text-white uppercase tracking-[2.5%] text-xl leading-5 p-3 w-full max-w-[157px]"
          >
            how it works
          </button>
        </div>
        <div className="flex gap-2">
          <Link href="https://t.me/CosmosOnSol" target="_blank">
            <div className="w-[48px] h-[48px] flex justify-center items-center rounded-full bg-white-0.1 backdrop-blur-footer-link">
              <Image
                src="/assets/svgs/telegram.svg"
                width={24}
                height={24}
                alt="Telegram"
              />
            </div>
          </Link>
          <Link href="https://github.com/TheCosmosWorld" target="_blank">
            <div className="w-[48px] h-[48px] flex justify-center items-center rounded-full bg-white-0.1 backdrop-blur-footer-link">
              <Image
                src="/assets/svgs/github.svg"
                width={24}
                height={24}
                alt="Github"
              />
            </div>
          </Link>
          <Link href="https://x.com/CosmosOnSolana" target="_blank">
            <div className="w-[48px] h-[48px] flex justify-center items-center rounded-full bg-white-0.1 backdrop-blur-footer-link">
              <Image
                src="/assets/svgs/twitter.svg"
                width={24}
                height={24}
                alt="Twitter"
              />
            </div>
          </Link>
        </div>
      </footer>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        content={modalContent}
      />
    </>
  );
}

export default Footer;
