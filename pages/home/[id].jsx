import React from 'react';
import HomePage from '../../components/secured/Home';
import DiscoverProvider from '../../components/contexts/DiscoverContext';
import AudioPlayerProvider from '../../components/contexts/AudioPlayerContext';
import StreamProvider from '../../components/contexts/StreamContext';
import UserProvider from '../../components/contexts/UserContext';
import ThemeProvider from '../../components/contexts/Themecontext';
import SearchProvider from '../../components/contexts/SearchContext';
import SEO from '../../components/SEO';

const Discover = () => {
  return (
    <>
      <SEO title="Zik-Stream | Home" />
      <SearchProvider>
        <ThemeProvider>
          <UserProvider>
            <DiscoverProvider>
              <AudioPlayerProvider>
                <StreamProvider>
                  <HomePage />
                </StreamProvider>
              </AudioPlayerProvider>
            </DiscoverProvider>
          </UserProvider>
        </ThemeProvider>
      </SearchProvider>
    </>
  );
};

export default Discover;
