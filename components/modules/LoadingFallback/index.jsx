import React from 'react';
import icons from '../../icons';

const LoadingFallback = () => {
  const { Loading } = icons;
  return (
    <div className="w-full flex justify-center mt-5">
      <Loading className="animate-spin text-4xl text-blue-500 text-center" />
    </div>
  );
};

export default LoadingFallback;
