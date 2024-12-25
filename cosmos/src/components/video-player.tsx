import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  demoVideo: string;
  loopVideo: string;
}

const VideoPlayer = ({ demoVideo, loopVideo }: VideoPlayerProps) => {
  const [isDemoPlaying, setIsDemoPlaying] = useState(true);
  const demoVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const demoVideoElement = demoVideoRef.current;

    if (demoVideoElement) {
      const handleDemoVideoEnd = () => {
        setIsDemoPlaying(false);
        const loopVideoElement = loopVideoRef.current;
        if (loopVideoElement) {
          loopVideoElement.play();
        }
      };

      demoVideoElement.addEventListener("ended", handleDemoVideoEnd);

      return () => {
        demoVideoElement.removeEventListener("ended", handleDemoVideoEnd);
      };
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 bottom-0 h-full w-full left-0 right-0 z-0 overflow-hidden md:absolute md:block ${
        isDemoPlaying ? "block" : "flex justify-center items-center"
      }`}
    >
      <video
        ref={demoVideoRef}
        src={demoVideo}
        className={`duration-500 ${
          isDemoPlaying ? "opacity-100" : "opacity-0 h-0"
        }`}
        controls={false}
        loop={false}
        muted
        playsInline
        autoPlay
      />
      <video
        ref={loopVideoRef}
        src={loopVideo}
        className={`duration-500 ${
          !isDemoPlaying ? "opacity-100" : "opacity-0"
        }`}
        controls={false}
        loop={true}
        muted
        playsInline
        width="100%"
        height="100%"
      />
    </motion.div>
  );
};

export default VideoPlayer;
