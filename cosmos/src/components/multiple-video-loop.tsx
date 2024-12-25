import React, { useState, useEffect, useRef } from "react";

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
        }, 90);
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

  return (
    <div className="relative w-full h-full">
      {videos.map((source, index) => (
        <video
          key={index}
          ref={videoRefs.current[index]}
          src={source}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-100 xl:object-cover 2xl:object-fill ${
            currentVideo === index && !isTransitioning ? "opacity-100" : "opacity-0"
          }`}
          width="100%"
          height="100%"
          controls={false}
          loop={false}
          muted
          playsInline
        />
      ))}
    </div>
  );
};

export default MultipleVideosLoop;
