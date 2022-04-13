import React, { useState, useEffect } from 'react';
import SongCard from '../../../../modules/SongCard';
import icons from '../../../../icons';
import PropTypes from 'prop-types';
import timeCoverter from '../../../../utils/helpers/streamsConverter';
import axios from 'axios';
import { useStream } from '../../../../contexts/StreamContext';
import { useAudioPlayer } from '../../../../contexts/AudioPlayerContext';

const SongLayout = ({ setTracks, song, isLoading }) => {
  const { Pause, Play, OutLineLike, FullLike, Ethereum } = icons;
  const [isFavorite, setIsFavorite] = useState(false);
  const [songPlayed, setSongPlayed] = useState({
    id: 0,
    genre: '',
  });
  const [songToStream, setSongToStream] = useState({
    genre: '',
    id: 0,
  });
  const { setSongId, payStream, readyToBeStreamed } = useStream();
  const { isPlaying, setIsPlaying } = useAudioPlayer();

  /////////////// add to favirite event here //////////////
  const addToFavorites = (song) => {
    axios.put('/api/update/addToFavorite', {});
  };

  const toggleFavorite = (state) => {
    setIsFavorite(state);
  };

  useEffect(() => {
    console.log('is ready to be streamed', readyToBeStreamed);
  }, [readyToBeStreamed]);

  useEffect(() => {
    console.log('song is playing ...', isPlaying);
  }, [isPlaying]);

  const toggleSongPlay = (song, id) => {
    console.log('song for playing', song);
    setIsPlaying(!isPlaying);
    setSongPlayed({
      id: id,
      genre: song.genre,
    });
  };

  const OnClickStream = async (song) => {
    setIsPlaying(false);
    setSongToStream({
      genre: song.genre,
      id: song.id,
    });
    setSongId(song.id);
    await payStream(song.streamingPrice);
  };

  return (
    <>
      <SongCard
        isLoading={isLoading}
        song={song}
        fallback={
          <div className="w-56 rounded-lg h-56 animate-pulse bg-gray-500" />
        }
      >
        <div
          style={{ backgroundImage: `url(${song.coverUrl})` }}
          className="w-56 h-56 bg-cover relative rounded-lg"
        >
          <div className="bg-[#00C3FF] bg-opacity-90 absolute bottom-0 w-full py-2 rounded-b-lg px-1 cursor-pointer flex justify-between items-center">
            {readyToBeStreamed &&
            songToStream.genre === song.genre &&
            songToStream.id === song.id ? (
              <div>
                {isPlaying &&
                songPlayed.id === song.id &&
                songPlayed.genre === song.genre ? (
                  <Pause
                    className="text-3xl"
                    onClick={() => {
                      toggleSongPlay(song, song.id);
                    }}
                  />
                ) : (
                  <Play
                    className="text-3xl"
                    onClick={() => {
                      toggleSongPlay(song, song.id);
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
            ) : (
              <button
                onClick={() => {
                  OnClickStream(song);
                }}
              >
                Stream Now
              </button>
            )}
            <p className="m-0 flex items-center">
              {song.streamingPrice}
              <Ethereum className="mx-2 bg-white px-2 py-2 text-3xl text-black rounded-full" />
            </p>
          </div>
        </div>
      </SongCard>
      <div className="flex justify-between items-center">
        <p className="flex flex-col">
          <span>{song.artistName}</span>
          <span className="text-gray-500 text-xs">
            {song.songTitle}
          </span>
          <span className="text-[#00C3FF] text-xs">streams:</span>
        </p>
        {!isFavorite ? (
          <OutLineLike
            className="text-2xl cursor-pointer"
            onClick={() => toggleFavorite(true)}
          />
        ) : (
          <FullLike
            className="text-2xl cursor-pointer"
            onClick={() => toggleFavorite(false)}
          />
        )}
      </div>
    </>
  );
};

SongLayout.propTypes = {
  setTracks: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SongLayout;
