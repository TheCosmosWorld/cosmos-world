import React, { useState, useEffect, useRef } from "react";

interface NarrationSoundProps {
  playSound: boolean;
}

const NarrationSound = ({ playSound }: NarrationSoundProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && playSound) {
      audioRef.current.play();
    }
  }, [playSound]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <audio ref={audioRef} src="/assets/sounds/cosmos.mp3" loop />
      <button
        onClick={togglePlayPause}
        className="bg-gray-800 text-white p-2 rounded-lg focus:outline-none hidden"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default NarrationSound;
