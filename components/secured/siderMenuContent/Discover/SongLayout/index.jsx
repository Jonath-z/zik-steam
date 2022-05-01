import React, { useState, useEffect } from 'react';
import SongCard from '../../../../modules/SongCard';
import icons from '../../../../icons';
import PropTypes from 'prop-types';
import timeCoverter from '../../../../utils/helpers/streamsConverter';
import axios from 'axios';
import { useStream } from '../../../../contexts/StreamContext';
import { useAudioPlayer } from '../../../../contexts/AudioPlayerContext';
import PlayPauseButton from '../../../../modules/AudioControls/PlayPauseButton';
import { useRouter } from 'next/router';
import { useDiscover } from '../../../../contexts/DiscoverContext';
import { useTheme } from '../../../../contexts/Themecontext';
import firstLetterCapitalizer from '../../../../utils/helpers/firstLetterCapitalizer';

const SongLayout = ({
  setTracks,
  song,
  isLoading,
  setSongToStream,
  songToStream,
  containerClass,
  songNameClass,
  artistNameClass,
  isColomnDisplayed,
}) => {
  const { payStream, readyToBeStreamed } = useStream();
  const { OutLineLike, FullLike, Ethereum } = icons;
  const [isFavorite, setIsFavorite] = useState(false);
  const { isPlaying, setIsPlaying } = useAudioPlayer();
  const route = useRouter();
  const { id } = route.query;
  const { updateSongs } = useDiscover();
  const { currentTheme } = useTheme();

  const addToFavorites = async (song) => {
    await axios.put('/api/update/addToFavorite', { id, song });
  };

  const deleteFromFavorite = async (song) => {
    await axios.post('/api/update/deleteFromFavorite', {
      id,
      song,
    });
  };

  const toggleFavorite = (isAdding, song) => {
    !isAdding ? deleteFromFavorite(song) : addToFavorites(song);
    setIsFavorite(!isFavorite);
    updateSongs();
  };

  const cleanUp = () => {
    setSongToStream({});
    setIsPlaying(!isPlaying);
  };

  const OnClickStream = async (song) => {
    cleanUp();
    await payStream(song.streamingPrice, song.id);
    setSongToStream(song);
    setTracks([
      {
        title: song.songTitle,
        cover: song.coverUrl,
        artist: song.artistName,
        audioSrc: song.songUrl,
        id: song.id,
      },
    ]);
    console.log('song to stream', songToStream);
  };

  return (
    <div className={`${containerClass}`}>
      <SongCard
        isLoading={isLoading}
        song={song}
        fallback={
          <div className="w-56 rounded-lg h-56 animate-pulse bg-gray-500 isMobileOrTablet:w-44 isMobileOrTablet:h-44" />
        }
      >
        <div
          style={{ backgroundImage: `url(${song.coverUrl})` }}
          className={`w-56 h-56 bg-cover relative rounded-lg ${
            isColomnDisplayed
              ? 'isMobileOrTablet:w-full isMobileOrTablet:h-44'
              : 'isMobileOrTablet:w-44 isMobileOrTablet:h-44'
          } `}
        >
          <div
            className={`bg-[#1890ff] bg-opacity-90 absolute bottom-0 w-full py-2 rounded-b-lg px-1 cursor-pointer flex justify-between items-center`}
          >
            {readyToBeStreamed &&
            songToStream.genre === song.genre &&
            songToStream.id === song.id ? (
              <div>
                <PlayPauseButton
                  isPlaying={isPlaying}
                  setTracks={() =>
                    setTracks([
                      {
                        title: song.songTitle,
                        image: song.coverUrl,
                        artist: song.artistName,
                        audioSrc: song.songUrl,
                      },
                    ])
                  }
                />
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
      <div className="flex justify-between items-center mt-2">
        <p className="flex flex-col">
          <span className={`${artistNameClass} text-gray-500`}>
            {firstLetterCapitalizer(song.artistName)}
          </span>
          <span className={`text-gray-500 text-xs ${songNameClass}`}>
            {firstLetterCapitalizer(song.songTitle)}
          </span>
          <span className="text-blue-500 text-xs">
            {timeCoverter(song.streamHours).time}{' '}
            {timeCoverter(song.streamHours).timeUnit} of streaming
          </span>
        </p>
        {!isFavorite && !song.isLiked ? (
          <OutLineLike
            className={`text-2xl cursor-pointer text-[${
              currentTheme.status ? 'black' : '#1890ff'
            }]`}
            onClick={() => toggleFavorite(true, song)}
          />
        ) : (
          <FullLike
            className={`text-2xl cursor-pointer text-[${
              currentTheme.status ? 'black' : '#1890ff'
            }]`}
            onClick={() => toggleFavorite(false, song)}
          />
        )}
      </div>
    </div>
  );
};

SongLayout.propTypes = {
  setTracks: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setSongToStream: PropTypes.func,
  songToStream: PropTypes.object,
  containerClass: PropTypes.string,
  songNameClass: PropTypes.string,
  artistNameClass: PropTypes.string,
  isColomnDisplayed: PropTypes.bool,
};

export default SongLayout;
