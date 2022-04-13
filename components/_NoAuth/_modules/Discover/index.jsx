import React, { useState, useEffect } from 'react';
import { useDiscover } from '../../../contexts/DiscoverContext';
import AudioPlayer from '../../../modules/AudioPlayer';
import { useAudioPlayer } from '../../../contexts/AudioPlayerContext';
import SongLayout from './SongLayout';
import { useStream } from '../../../contexts/StreamContext';
import { useRouter } from 'next/router';

const Discover = () => {
  const { artists, songByGenre, isLoading } = useDiscover();
  const { isPlaying, setIsPlaying } = useAudioPlayer();
  const {
    setUserId,
    setDuration,
    setSongCurrentTime,
    setIsPlayed,
    readyToBeStreamed,
  } = useStream();
  const route = useRouter();
  const { id } = route.query;
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setUserId(id);
  }, [id, setUserId]);

  useEffect(() => {
    console.log('song by genre in discover ', songByGenre);
    if (songByGenre.length > 0)
      setTracks([
        {
          title: songByGenre[1].songs[0].songTitle,
          image: songByGenre[1].songs[0].coverUrl,
          artist: songByGenre[1].songs[0].artistName,
          audioSrc: songByGenre[1].songs[0].songUrl,
        },
      ]);
  }, [songByGenre]);

  useEffect(() => {
    setIsPlayed(isPlaying);
  }, [isPlaying, setIsPlayed]);

  return (
    <div>
      {songByGenre.map((song, index) => {
        return (
          <div key={index}>
            <h1 className="text-3xl">
              {song.songs.length !== 0 && song.genre}
            </h1>
            <div className="flex">
              {song.songs.map((song, index) => {
                return (
                  <div key={index} className="my-4 mx-2">
                    <SongLayout
                      setTracks={setTracks}
                      song={song}
                      isLoading={isLoading}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {tracks.length !== 0 && readyToBeStreamed && (
        <AudioPlayer
          tracks={tracks}
          extarnalIsPlaying={isPlaying.isPlaying}
          setSongCurrentTime={setSongCurrentTime}
          setDuration={setDuration}
        />
      )}
    </div>
  );
};

export default Discover;
