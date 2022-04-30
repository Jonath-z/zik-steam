import React from 'react';
import { useMediaQuery } from 'react-responsive';

const useResponsive = (screen = '(min-width: 1224px)') => {
  const matches = useMediaQuery({ query: screen });

  return matches;
};

export default useResponsive;
