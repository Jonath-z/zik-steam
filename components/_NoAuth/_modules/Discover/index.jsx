import React, { useState, useEffect } from 'react';
import { useDiscover } from '../../../contexts/DiscoverContext';
import AudioPlayer from '../../../modules/AudioPlayer';
import { useAudioPlayer } from '../../../contexts/AudioPlayerContext';
import SongLayout from './SongLayout';

const Discover = () => {
  const { artists, songByGenre, isLoading } = useDiscover();
  const { isPlaying, setIsPlaying } = useAudioPlayer();
  const [songPlayed, setSongPlayed] = useState({
    index: 0,
    genre: '',
  });

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (songByGenre.length > 0)
      setTracks([
        {
          title: songByGenre[0].songs[0].songTitle,
          image: songByGenre[0].songs[0].coverUrl,
          artist: songByGenre[0].songs[0].artistName,
          audioSrc: songByGenre[0].songs[0].songUrl,
        },
      ]);
  }, [songByGenre]);

  const toggleSongPlay = (genre, index) => {
    console.log('index is ', index, genre);
    setIsPlaying(!isPlaying);
    setSongPlayed({
      index: index,
      genre: genre,
    });
  };

  return (
    <div>
      {songByGenre.map((song, index) => {
        return (
          <div key={index}>
            <h1 className="text-3xl">{song.genre}</h1>
            <div className="flex">
              {song.songs.map((song, index) => {
                return (
                  <div key={index} className="my-4 mx-2">
                    <SongLayout
                      setTracks={setTracks}
                      toggleSongPlay={toggleSongPlay}
                      song={song}
                      isPlaying={isPlaying}
                      songIndex={index}
                      songPlayed={songPlayed}
                      isLoading={isLoading}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {tracks.length !== 0 && (
        <AudioPlayer
          tracks={tracks}
          extarnalIsPlaying={isPlaying.isPlaying}
        />
      )}
    </div>
  );
};

export default Discover;
