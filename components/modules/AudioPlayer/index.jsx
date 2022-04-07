/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import AudioControls from './AudioControls';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

const AudioPlayer = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, artist, image, audioSrc } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      console.log('play');
      //   startTimer();
    } else {
      audioRef.current.pause();
      console.log('pause');
    }
  }, [isPlaying]);

  useEffect(() => {
    const audioClean = audioRef.current;
    const intervalClean = intervalRef.current;
    return () => {
      audioClean.pause();
      clearInterval(intervalClean);
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [audioSrc]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const toPrevTrack = () => {
    trackIndex - 1 < 0
      ? setTrackIndex(tracks.length - 1)
      : setTrackIndex(trackIndex - 1);
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%,
        color-stop(${currentPercentage}, #fff), 
        color-stop(${currentPercentage}, #777))
  `;

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center bg-[#00C3FF] bg-opacity-30 py-1">
        <Col className="flex items-center">
          <img
            className="artwork rounded-full"
            width={100}
            height={100}
            src={image}
            alt={`track artwork for ${title} by ${artist}`}
          />
          <div className="px-2">
            <h2 className="title">{title}</h2>
            <h3 className="artist">{artist}</h3>
          </div>
        </Col>
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress w-96"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
      </div>
    </>
  );
};

AudioPlayer.propTypes = {
  tracks: PropTypes.array,
};

export default AudioPlayer;
