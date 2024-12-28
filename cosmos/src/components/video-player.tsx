import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/contexts/app-context";

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
  const { isVideoLoading, setIsVideoLoading, pauseRotation } = useAppContext();

  const demoVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);

  // Pause loop rotation
  useEffect(() => {
    const loopVideoElement = loopVideoRef.current;
    
    if (pauseRotation) {
      loopVideoElement?.pause();
    } else {
      loopVideoElement?.play();
    }
  }, [pauseRotation]);

  useEffect(() => {
    const demoVideoElement = demoVideoRef.current;
    const loopVideoElement = loopVideoRef.current;

    if (demoVideoElement) {
      const handleLoadedMetadata = () => {
        setIsVideoLoading(false);
        demoVideoElement.play();
      };

      const handleDemoVideoEnd = () => {
        setIsDemoPlaying(false);
        if (loopVideoElement && !pauseRotation) {
          loopVideoElement.play();
        }
      };

      const handlePause = () => {
        if (loopVideoElement && pauseRotation) {
          loopVideoElement.pause();
        }
      };

      demoVideoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      demoVideoElement.addEventListener("ended", handleDemoVideoEnd);
      loopVideoElement?.addEventListener("play", handlePause);

      return () => {
        demoVideoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        demoVideoElement.removeEventListener("ended", handleDemoVideoEnd);
        loopVideoElement?.removeEventListener("play", handlePause);
      };
    }
  }, [setIsVideoLoading, pauseRotation]);

  if (isMobile) {
    return (
      <>
        {isVideoLoading && (
          <div className="flex justify-center items-center md:hidden">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white"></div>
          </div>
        )}
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
      </>
    );
  } else {
    return (
      <>
        {isVideoLoading && (
          <div className="hidden justify-center items-center absolute top-0 left-0 right-0 bottom-0 md:flex">
            <div className="animate-spin rounded-full h-60 w-60 border-b-2 border-white"></div>
          </div>
        )}
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
      </>
    );
  }
};

export default VideoPlayer;
