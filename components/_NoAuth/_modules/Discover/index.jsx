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
    setSongId,
    setSongPrice,
    setSongTotalTime,
    setSongCurrentTime,
    setIsSongPaused,
    getPayementError,
    readyToBeStreamed,
    payStream,
    updateStreamingTime,
  } = useStream();
  const route = useRouter();
  const { id } = route.query;
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setUserId(id);
  }, [id, setUserId]);

  useEffect(() => {
    console.log('is ready to be streamed', readyToBeStreamed);
  }, [readyToBeStreamed]);

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

  const stream = (song) => {
    setSongId(song.id);
    setSongPrice(song.streamingPrice);
    setIsSongPaused(!isPlaying);
    payStream();
    if (!isPlaying) updateStreamingTime();
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
                      song={song}
                      isPlaying={isPlaying}
                      setIsPlaying={setIsPlaying}
                      songIndex={index}
                      isLoading={isLoading}
                      isReadyToBeStreamed={readyToBeStreamed}
                      stream={stream}
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
          setSongCurrentTime={setSongCurrentTime}
          setSongTotalTime={setSongTotalTime}
        />
      )}
    </div>
  );
};

export default Discover;
