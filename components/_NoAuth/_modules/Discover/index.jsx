import React, { useState, useEffect } from 'react';
import { useDiscover } from '../../../contexts/DiscoverContext';
import AudioPlayer from '../../../modules/AudioPlayer';
import SongCard from '../../../modules/SongCard';
import {
  AiOutlinePauseCircle as Pause,
  AiOutlinePlayCircle as Play,
} from 'react-icons/ai';
import { useAudioPlayer } from '../../../contexts/AudioPlayerContext';

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
                    <SongCard
                      key={index}
                      isLoading={false}
                      song={song}
                      fallback={<div />}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${song.coverUrl})`,
                        }}
                        className="w-56 h-56 bg-cover relative rounded-lg"
                      >
                        <div className="bg-[#00C3FF] bg-opacity-90 absolute bottom-0 w-full py-2 rounded-b-lg px-1 cursor-pointer">
                          {isPlaying &&
                          songPlayed.index === index &&
                          songPlayed.genre === song.genre ? (
                            <Pause
                              className="text-3xl"
                              onClick={() => {
                                toggleSongPlay(song.genre, index);
                              }}
                            />
                          ) : (
                            <Play
                              className="text-3xl"
                              onClick={() => {
                                toggleSongPlay(song.genre, index);
                                setTracks([
                                  {
                                    title: song.songTitle,
                                    image: song.coverUrl,
                                    artist: song.artistName,
                                    audioSrc: song.songUrl,
                                  },
                                ]);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </SongCard>
                    <div>
                      <p className="flex flex-col">
                        <span>{song.artistName}</span>
                        <span className="text-gray-500 text-xs">
                          {song.songTitle}
                        </span>
                      </p>
                    </div>
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
