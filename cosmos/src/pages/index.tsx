import Footer from "@/components/footer";
import Tabs from "@/components/tabs";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NarrationSound from "@/components/narration-sound";

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [animateScreen, setAnimateScreen] = useState(false);

  const handleClick = () => {
    setAnimateScreen(true);
  };

  const handleAnimationComplete = () => {
    if (animateScreen) {
      setTimeout(() => {
        setShowLanding(false);
      }, 600);
    }
  };

  const renderView = () => {
    if (showLanding) {
      return (
        <AnimatePresence>
          <div className="relative z-[1]">
            <div className="pt-16">
              <Image
                src="/assets/svgs/logo.svg"
                width={126.74}
                height={22.84}
                alt="Cosmos Logo"
                className="mx-auto"
              />
            </div>
            <div className="mt-[300px] max-w-[400px] mx-auto relative z-[1]">
              <motion.button
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: animateScreen ? 0.001 : 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                onClick={handleClick}
                onAnimationComplete={handleAnimationComplete}
                className="flex items-center justify-center relative w-full h-full group"
              >
                <h1 className="text-2xl leading-[28.8px] text-[#f2f2ff88] duration-150 group-hover:text-white">
                  ENTER THE COSMOS
                </h1>
                <div className="absolute w-[282.36px] h-[282.36px] rounded-full border border-white-0.7 opacity-40 duration-150 group-hover:scale-90"></div>
                <div className="absolute w-[288px] h-[288px] rounded-full border border-white-0.7 opacity-60 duration-150 group-hover:scale-90"></div>
                <div className="absolute w-[294px] h-[294px] rounded-full border border-white-0.7 opacity-80 duration-150 group-hover:scale-90"></div>
                <div className="absolute w-[300px] h-[300px] rounded-full border border-white-0.7 duration-150 group-hover:scale-90"></div>
              </motion.button>
            </div>
          </div>
        </AnimatePresence>
      );
    }

    return (
      <div className="relative z-[1] min-h-screen overflow-hidden">
        <div className="flex justify-between pt-10 px-10 relative z-[2]">
          <div>
            <Image
              src="/assets/svgs/logo.svg"
              width={126.74}
              height={22.84}
              alt="Cosmos Logo"
              className="mx-auto"
            />
          </div>
          <Tabs />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 z-0 overflow-hidden"
        >
          <video
            src="/assets/videos/planetanimation.mp4"
            autoPlay
            muted
            loop
            playsInline
            width="100%"
            height="100%"
          />
        </motion.div>
        <NarrationSound playSound={!showLanding} />
        <div className="absolute bottom-0 right-0 left-0 w-full">
          <Footer />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#010103] min-h-screen">
      {renderView()}
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: animateScreen ? 2.5 : 1 }}
        exit={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="fixed top-0 animate-spin-slow z-0"
      >
        <Image
          src="/assets/svgs/stars-bg.svg"
          width={1440}
          height={1037.19}
          alt="Stars"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: animateScreen ? 2.5 : 1 }}
        exit={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="fixed top-0 animate-spin-slow-reverse z-0"
      >
        <Image
          src="/assets/svgs/stars-bg.svg"
          width={1440}
          height={1037.19}
          alt="Stars"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: animateScreen ? 2.5 : 1 }}
        exit={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="fixed top-0 animate-spin-slow-reverse z-0"
      >
        <Image
          src="/assets/svgs/stars-bg.svg"
          width={1440}
          height={1037.19}
          alt="Stars"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: animateScreen ? 2.5 : 1 }}
        exit={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="fixed top-0 animate-spin-slow z-0"
      >
        <Image
          src="/assets/svgs/stars-bg.svg"
          width={1440}
          height={1037.19}
          alt="Stars"
        />
      </motion.div>
    </div>
  );
}
