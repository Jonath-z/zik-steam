import React from 'react';
import HomePage from '../../components/_NoAuth/Home';
import UploadSongProvider from '../../components/contexts/UploadSongContext';
import DiscoverProvider from '../../components/contexts/DiscoverContext';
import AudioPlayerProvider from '../../components/contexts/AudioPlayerContext';
import { useRouter } from 'next/router';

const Discover = () => {
  const route = useRouter();
  const { id } = route.query;
  return (
    <UploadSongProvider id={id}>
      <DiscoverProvider>
        <AudioPlayerProvider>
          <HomePage />
        </AudioPlayerProvider>
      </DiscoverProvider>
    </UploadSongProvider>
  );
};

export default Discover;
