import { useState, useRef, useEffect } from "react";

// Sample tracks for the music player
const tracks = [
  {
    title: "Song One",
    artist: "Artist A",
    src: "/music/song-one.mp3",
  },
  {
    title: "Song Two",
    artist: "Artist B",
    src: "/music/song-two.mp3",
  },
  {
    title: "Song Three",
    artist: "Artist C",
    src: "/music/song-three.mp3",
  },
];

const MusicPlayer = () => {
  // State variables
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef(new Audio(tracks[currentTrackIndex].src));
  const intervalRef = useRef(null);

  const { duration } = audioRef.current;

  // Update the audio source when the track changes
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(tracks[currentTrackIndex].src);
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

  // Toggle Play/Pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle track progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTrackProgress(audioRef.current.currentTime);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [intervalRef, isPlaying]);

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    }
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
    }, 1000);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-purple-800 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        {/* Track info */}
        <h1 className="text-2xl font-bold mb-2">{tracks[currentTrackIndex].title}</h1>
        <h2 className="text-lg text-gray-600 mb-4">{tracks[currentTrackIndex].artist}</h2>

        {/* Track progress */}
        <div className="w-full mb-4">
          <input
            type="range"
            value={trackProgress}
            max={duration ? duration : `${duration}`}
            onChange={(e) => onScrub(Number(e.target.value))}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatTime(trackProgress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center justify-between">
          <button
            className="text-gray-600 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            onClick={handlePrevTrack}
          >
            Prev
          </button>
          <button
            className={`${
              isPlaying ? "bg-red-500" : "bg-green-500"
            } text-white p-2 px-6 rounded-lg font-semibold hover:opacity-90`}
            onClick={togglePlayPause}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            className="text-gray-600 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            onClick={handleNextTrack}
          >
            Next
          </button>
        </div>

        {/* Volume Control */}
        <div className="mt-4">
          <label className="block text-sm text-gray-600 mb-1">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const newVolume = Number(e.target.value);
              setVolume(newVolume);
              audioRef.current.volume = newVolume;
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
