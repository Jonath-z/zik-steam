import React from 'react';
import icons from '../../../icons';
import PropTypes from 'prop-types';

const PlayPauseButton = ({
  isPlaying,
  onPlayPauseClick,
  setTracks,
  //   track,
}) => {
  const { Pause, Play } = icons;
  return (
    <div>
      {isPlaying ? (
        <button
          type="button"
          className="pause"
          onClick={() => {
            onPlayPauseClick(false);
          }}
          aria-label="Pause"
        >
          <Pause className="text-4xl" />
        </button>
      ) : (
        <button
          type="button"
          className="play"
          onClick={() => {
            onPlayPauseClick(true);
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
  onPlayPauseClick: PropTypes.func.isRequired,
  setTracks: PropTypes.func,
  track: PropTypes.object,
};

export default PlayPauseButton;
