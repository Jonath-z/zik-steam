import React from 'react';
import HomePage from '../../components/_NoAuth/Home';
import DiscoverProvider from '../../components/contexts/DiscoverContext';
import AudioPlayerProvider from '../../components/contexts/AudioPlayerContext';
import StreamProvider from '../../components/contexts/StreamContext';
import UserProvider from '../../components/contexts/UserContext';

const Discover = () => {
  return (
    <UserProvider>
      <DiscoverProvider>
        <AudioPlayerProvider>
          <StreamProvider>
            <HomePage />
          </StreamProvider>
        </AudioPlayerProvider>
      </DiscoverProvider>
    </UserProvider>
  );
};

export default Discover;
