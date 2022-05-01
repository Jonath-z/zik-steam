import React, { useState, useEffect } from 'react';
import { useDiscover } from '../../../contexts/DiscoverContext';
import { useAudioPlayer } from '../../../contexts/AudioPlayerContext';
import SongLayout from './SongLayout';
import { useStream } from '../../../contexts/StreamContext';
import { useSearch } from '../../../contexts/SearchContext';
import { useTheme } from '../../../contexts/Themecontext';
import firstLetterCapitalizer from '../../../utils/helpers/firstLetterCapitalizer';
import icons from '../../../icons';
import dynamic from 'next/dynamic';
const Player = dynamic(() => import('../../../modules/Player'), {
  ssr: false,
});
import useResponsive from '../../../hooks/useResponsive';

const Discover = () => {
  const { songByGenre, isLoading } = useDiscover();
  const { isPlaying } = useAudioPlayer();
  const { currentTheme } = useTheme();
  const { setIsPlayed, readyToBeStreamed } = useStream();
  const { setSongList } = useSearch();
  const [tracks, setTracks] = useState([]);
  const [songToStream, setSongToStream] = useState({});
  const [isColomnDisplayed, setIsColomnDisplayed] = useState({
    genre: '',
    status: true,
  });
  const isTabletOrMobile = useResponsive('(max-width: 1224px)');
  const isMobilePhone = useResponsive('(max-width: 600px)');
  const { ArrowRight, ArrowDown } = icons;
  const songList =
    songByGenre.length > 0 &&
    document.getElementsByClassName('song-container');

  useEffect(() => {
    console.log('song by genre in discover ', songByGenre);
    if (songByGenre.length > 0)
      setTracks([
        {
          title: '',
          image: '',
          artist: '',
          audioSrc: '',
        },
      ]);
  }, [songByGenre]);

  useEffect(() => {
    setIsPlayed(isPlaying);
  }, [isPlaying, setIsPlayed]);

  useEffect(() => {
    setSongList(songList);
  }, [setSongList, songList]);

  const toggleSongDisplay = (songGenre) => {
    console.log('this genre', songGenre);
    setIsColomnDisplayed({
      genre: songGenre,
      status: !isColomnDisplayed.status,
    });
  };

  return (
    <div>
      {songByGenre.map((song, index) => {
        return (
          <div key={index}>
            <h1
              className={`text-3xl isMobileOrTablet:my-3 flex justify-between items-center ${
                currentTheme.status ? 'text-black' : 'text-white'
              } ${isTabletOrMobile && 'px-2'}`}
            >
              {song.songs.length !== 0 &&
                firstLetterCapitalizer(song.genre)}
              <span>
                {isColomnDisplayed.status &&
                isColomnDisplayed.genre === song.genre ? (
                  <ArrowRight
                    onClick={() => toggleSongDisplay(song.genre)}
                  />
                ) : (
                  <ArrowDown
                    onClick={() => toggleSongDisplay(song.genre)}
                  />
                )}
              </span>
            </h1>
            <div
              className={`w-full flex ${
                !isColomnDisplayed.status &&
                isColomnDisplayed.genre === song.genre
                  ? `${
                      isMobilePhone
                        ? 'grid grid-cols-2 justify-center items-center gap-3'
                        : 'grid grid-cols-4 justify-center'
                    }`
                  : 'flex'
              } overflow-x-auto`}
            >
              {song.songs.map((song, index) => {
                return (
                  <div key={index} className="my-4 mx-2">
                    <SongLayout
                      setTracks={setTracks}
                      song={song}
                      isLoading={isLoading}
                      setSongToStream={setSongToStream}
                      songToStream={songToStream}
                      containerClass={'song-container'}
                      songNameClass={'song-name'}
                      artistNameClass={'artist-name'}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {tracks.length !== 0 && readyToBeStreamed && (
        <Player tracks={tracks} />
      )}
    </div>
  );
};

export default Discover;
