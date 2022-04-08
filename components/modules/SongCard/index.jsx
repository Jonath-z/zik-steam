import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlinePauseCircle as Pause,
  AiOutlinePlayCircle as Play,
} from 'react-icons/ai';

const SongCard = ({ fallback, isLoading, children }) => {
  if (isLoading) return fallback;
  return children;
};

SongCard.propTypes = {
  fallback: PropTypes.element.isRequired,
  isLoading: PropTypes.bool.isRequired,
  toggleSongPlay: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default SongCard;
