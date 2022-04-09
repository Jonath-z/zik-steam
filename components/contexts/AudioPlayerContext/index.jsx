import React, { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

const defaultContext = {
  isPlaying: false,
  setIsPlaying: () => null,
};

const AudioPlayerContext = createContext(defaultContext);
export const useAudioPlayer = () => useContext(AudioPlayerContext);

const AudioPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <AudioPlayerContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

AudioPlayerProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AudioPlayerProvider;
