import React from 'react';
import icons from '../../../icons';
import PropTypes from 'prop-types';

const PlayPauseButton = ({
  isPlaying,
  setTracks,
  //   track,
}) => {
  const { Pause, Play } = icons;
  return (
    <div className="flex justify-center items-center">
      {isPlaying ? (
        <button
          type="button"
          className="pause"
          onClick={() => {}}
          aria-label="Pause"
        >
          <Pause className="text-4xl" />
        </button>
      ) : (
        <button
          type="button"
          className="play"
          onClick={() => {
            setTracks();
          }}
          aria-label="Play"
        >
          <Play className="text-4xl" />
        </button>
      )}
    </div>
  );
};

PlayPauseButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  setTracks: PropTypes.func,
  track: PropTypes.object,
};

export default PlayPauseButton;
