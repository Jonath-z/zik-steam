import React from 'react';
import HomePage from '../../components/_NoAuth/Home';
import UploadSongProvider from '../../components/contexts/UploadSongContext';
import DiscoverProvider from '../../components/contexts/DiscoverContext';

const Discover = () => {
  return (
    <UploadSongProvider>
      <DiscoverProvider>
        <HomePage />
      </DiscoverProvider>
    </UploadSongProvider>
  );
};

export default Discover;
