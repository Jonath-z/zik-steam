import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlinePlayCircle as Play,
  AiOutlinePauseCircle as Pause,
} from 'react-icons/ai';
import {
  MdOutlineSkipPrevious as Prev,
  MdOutlineSkipNext as Next,
} from 'react-icons/md';

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="audio-controls">
      <button
        type="button"
        className="prev"
        aria-label="Previous"
        onClick={onPrevClick}
      >
        <Prev />
      </button>
      {isPlaying ? (
        <button
          type="button"
          className="pause"
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
        >
          <Pause />
        </button>
      ) : (
        <button
          type="button"
          className="play"
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          <Play />
        </button>
      )}
      <button
        type="button"
        className="next"
        aria-label="Next"
        onClick={onNextClick}
      >
        <Next />
      </button>
    </div>
  );
};

AudioControls.propTypes = {
  isPlaying: PropTypes.bool,
  onPlayPauseClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

export default AudioControls;
