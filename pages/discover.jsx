import React from 'react';
import DiscoverPage from '../components/_NoAuth/Discover';
import UploadSongProvider from '../components/contexts/UploadSongContext';

const Discover = () => {
  return (
    <UploadSongProvider>
      <DiscoverPage />
    </UploadSongProvider>
  );
};

export default Discover;
