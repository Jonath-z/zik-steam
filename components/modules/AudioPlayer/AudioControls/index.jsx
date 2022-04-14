import React from 'react';
import PropTypes from 'prop-types';
import {
  MdOutlineSkipPrevious as Prev,
  MdOutlineSkipNext as Next,
} from 'react-icons/md';
import PlayPauseButton from './PlayPauseButton';

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
        <Prev className="text-4xl" />
      </button>
      <PlayPauseButton
        isPlaying={isPlaying}
        onPlayPauseClick={onPlayPauseClick}
        setTracks={() => null}
        // track={null}
      />
      <button
        type="button"
        className="next"
        aria-label="Next"
        onClick={onNextClick}
      >
        <Next className="text-4xl" />
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
