import React, { useState, useEffect } from 'react';
import { useDiscover } from '../../../contexts/DiscoverContext';
import { useAudioPlayer } from '../../../contexts/AudioPlayerContext';
import SongLayout from './SongLayout';
import { useStream } from '../../../contexts/StreamContext';
import { useSearch } from '../../../contexts/SearchContext';
import { useTheme } from '../../../contexts/Themecontext';
import dynamic from 'next/dynamic';
const Player = dynamic(() => import('../../../modules/Player'), {
  ssr: false,
});

const Discover = () => {
  const { songByGenre, isLoading } = useDiscover();
  const { isPlaying } = useAudioPlayer();
  const { currentTheme } = useTheme();
  const { setIsPlayed, readyToBeStreamed } = useStream();
  const { setSongList } = useSearch();
  const [tracks, setTracks] = useState([]);
  const [songToStream, setSongToStream] = useState({});
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

  return (
    <div>
      {songByGenre.map((song, index) => {
        return (
          <div key={index}>
            <h1
              className={`text-3xl ${
                currentTheme.status ? 'text-black' : 'text-white'
              }`}
            >
              {song.songs.length !== 0 && song.genre}
            </h1>
            <div className="flex w-full overflow-x-auto">
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
