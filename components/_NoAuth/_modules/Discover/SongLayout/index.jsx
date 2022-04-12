import React, { useState, useEffect } from 'react';
import SongCard from '../../../../modules/SongCard';
import icons from '../../../../icons';
import PropTypes from 'prop-types';
import timeCoverter from '../../../../utils/helpers/streamsConverter';

const SongLayout = ({
  setTracks,
  song,
  isPlaying,
  setIsPlaying,
  songIndex,
  isLoading,
  isReadyToBeStreamed,
  stream,
}) => {
  const { Pause, Play, OutLineLike, FullLike, Ethereum } = icons;
  const [isFavorite, setIsFavorite] = useState(false);
  const [songPlayed, setSongPlayed] = useState({
    index: 0,
    genre: '',
  });
  const [songToStream, setSongTostream] = useState({
    genre: '',
    index: 0,
  });

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    console.log('is ready to be streamed', isReadyToBeStreamed);
  }, [isReadyToBeStreamed]);

  const toggleSongPlay = (song, index) => {
    setIsPlaying(!isPlaying);
    setSongPlayed({
      index: index,
      genre: song.genre,
    });
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
          style={{
            backgroundImage: `url(${song.coverUrl})`,
          }}
          className="w-56 h-56 bg-cover relative rounded-lg"
        >
          <div className="bg-[#00C3FF] bg-opacity-90 absolute bottom-0 w-full py-2 rounded-b-lg px-1 cursor-pointer flex justify-between items-center">
            {isReadyToBeStreamed &&
            songToStream.genre === song.genre &&
            songToStream.index === songIndex ? (
              <div>
                {isPlaying &&
                songPlayed.index === songIndex &&
                songPlayed.genre === song.genre ? (
                  <Pause
                    className="text-3xl"
                    onClick={() => {
                      toggleSongPlay(song, songIndex);
                    }}
                  />
                ) : (
                  <Play
                    className="text-3xl"
                    onClick={() => {
                      toggleSongPlay(song, songIndex);
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
                  stream(song);
                  setSongTostream({
                    genre: song.genre,
                    index: songIndex,
                  });
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
            onClick={toggleFavorite}
          />
        ) : (
          <FullLike
            className="text-2xl cursor-pointer"
            onClick={toggleFavorite}
          />
        )}
      </div>
    </>
  );
};

SongLayout.propTypes = {
  setTracks: PropTypes.func.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  songIndex: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isReadyToBeStreamed: PropTypes.bool.isRequired,
  stream: PropTypes.func.isRequired,
};

export default SongLayout;
