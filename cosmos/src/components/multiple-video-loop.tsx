import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface MultipleVideosLoop {
  videos: string[];
}

const MultipleVideosLoop = ({ videos }: MultipleVideosLoop) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef(
    videos.map(() => React.createRef<HTMLVideoElement>())
  );

  useEffect(() => {
    const video = videoRefs.current[currentVideo].current;

    if (video) {
      video.play();

      const handleVideoEnd = () => {
        setIsTransitioning(true);
        setTimeout(() => {
          const nextVideo = (currentVideo + 1) % videos.length;
          setCurrentVideo(nextVideo);
          setIsTransitioning(false);
        }, 101);
      };

      video.addEventListener("ended", handleVideoEnd);

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [currentVideo, videos.length]);

  useEffect(() => {
    if (videoRefs.current[0].current) {
      videoRefs.current[0].current.play();
    }
  }, []);

  return videos.map((source, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: currentVideo === 0 ? 0.2 : 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute top-0 z-0 overflow-hidden"
    >
      <video
        ref={videoRefs.current[index]}
        src={source}
        className={`transition-opacity duration-100 ${
          currentVideo === index && !isTransitioning
            ? "opacity-100"
            : "opacity-0"
        }`}
        width="100%"
        height="100%"
        controls={false}
        loop={false}
        muted
        playsInline
      />
    </motion.div>
  ));
};

export default MultipleVideosLoop;
