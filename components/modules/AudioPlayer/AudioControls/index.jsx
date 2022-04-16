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
    <div className="flex justify-around items-center">
      <button
        type="button"
        className="text-xl"
        aria-label="Previous"
        onClick={onPrevClick}
      >
        <Prev className="text-2xl" />
      </button>
      <PlayPauseButton
        isPlaying={isPlaying}
        onPlayPauseClick={onPlayPauseClick}
        setTracks={() => null}
        // track={null}
      />
      <button
        type="button"
        className="text-xl"
        aria-label="Next"
        onClick={onNextClick}
      >
        <Next className="text-2xl" />
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
