import React from 'react';
import HomePage from '../../components/_NoAuth/Home';
import UploadSongProvider from '../../components/contexts/UploadSongContext';
import DiscoverProvider from '../../components/contexts/DiscoverContext';
import AudioPlayerProvider from '../../components/contexts/AudioPlayerContext';
import { useRouter } from 'next/router';
import StreamProvider from '../../components/contexts/StreamContext';

const Discover = () => {
  const route = useRouter();
  const { id } = route.query;
  console.log('my user id', id);

  return (
    <UploadSongProvider id={id}>
      <DiscoverProvider>
        <AudioPlayerProvider>
          <StreamProvider>
            <HomePage />
          </StreamProvider>
        </AudioPlayerProvider>
      </DiscoverProvider>
    </UploadSongProvider>
  );
};

export default Discover;
