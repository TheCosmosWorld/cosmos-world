import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  demoVideo: string;
  loopVideo: string;
  isMobile?: boolean;
}

const VideoPlayer = ({
  demoVideo,
  loopVideo,
  isMobile = false,
}: VideoPlayerProps) => {
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

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className={"min-h-[350px] w-full overflow-hidden relative md:hidden"}
      >
        <video
          ref={demoVideoRef}
          src={demoVideo}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-700 ${
            isDemoPlaying ? "opacity-100" : "opacity-0"
          }`}
          controls={false}
          loop={false}
          muted
          playsInline
          autoPlay
          width="100%"
          height="100%"
        />
        <video
          ref={loopVideoRef}
          src={loopVideo}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-700 ${
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
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className={`hidden absolute inset-0 h-full w-full overflow-hidden md:block`}
      >
        <video
          ref={demoVideoRef}
          src={demoVideo}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-700 ${
            isDemoPlaying ? "opacity-100" : "opacity-0"
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
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-700 ${
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
  }
};

export default VideoPlayer;
