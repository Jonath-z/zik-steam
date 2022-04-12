import React from 'react';
import PropTypes from 'prop-types';

const SongCard = ({ fallback, isLoading, children }) => {
  if (isLoading) return fallback;
  return children;
};

SongCard.propTypes = {
  fallback: PropTypes.element.isRequired,
  isLoading: PropTypes.bool.isRequired,
  toggleSongPlay: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default SongCard;
