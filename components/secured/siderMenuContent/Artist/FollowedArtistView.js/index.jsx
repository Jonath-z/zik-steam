/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDiscover } from '../../../../contexts/DiscoverContext';
import PlayPauseButton from '../../../../modules/AudioControls/PlayPauseButton';
import { useAudioPlayer } from '../../../../contexts/AudioPlayerContext';
import { useStream } from '../../../../contexts/StreamContext';
import icons from '../../../../icons';
import LoadingFallback from '../../../../modules/LoadingFallback';
import { useTheme } from '../../../../contexts/Themecontext';
import useResponsive from '../../../../hooks/useResponsive';
import dynamic from 'next/dynamic';
const Player = dynamic(() => import('../../../../modules/Player'), {
  ssr: false,
});

const FollowedArtistView = ({ artist, toggleArtistView }) => {
  const { Plus, Ethereum } = icons;
  const { isLoading, allSong } = useDiscover();
  const { isPlaying, setIsPlaying } = useAudioPlayer();
  const { readyToBeStreamed, payStream, setTracks } = useStream();
  const [artistSongs, setArtistSong] = useState([]);
  const [artistSongsDetails, setArtistsSongsDetails] = useState({
    streams: '0 minutes',
  });
  const [songToStreamId, setSongToStreamId] = useState('');
  const { currentTheme } = useTheme();
  const isMobile = useResponsive('(max-width: 600px)');

  const loadArtistSong = useCallback(async () => {
    const songsByArtistName = allSong.filter(
      (song) =>
        song.artistName.toUpperCase() ===
        artist.artist_name.toUpperCase(),
    );
    setArtistSong(songsByArtistName);
  }, [artist.artist_name, allSong]);

  const loadArtistSongsDetails = useCallback(async () => {
    const response = await axios.post(
      '/api/query/artistSongsDetails',
      {
        artistName: artist.artist_name,
      },
    );
    console.log('my response', response);
    setArtistsSongsDetails({
      streams: response.data.streams,
    });
  }, [artist.artist_name]);

  useEffect(() => {
    loadArtistSongsDetails();
  }, [loadArtistSongsDetails]);

  useEffect(() => {
    loadArtistSong();
  }, [loadArtistSong]);

  const onClickStream = async (song) => {
    setSongToStreamId(song.id);
    setTracks([
      {
        title: song.songTitle,
        image: song.coverUrl,
        artist: song.artistName,
        audioSrc: song.songUrl,
        id: song.id,
      },
    ]);
  };

  if (isLoading) return <LoadingFallback />;

  return (
    <div
      className={`bg-[#f0f2f5] ${
        currentTheme.status ? 'bg-[#f0f2f5]' : `bg-[#001529]`
      }  absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-y-auto px-32 isMobileOrTablet:px-5 pb-10`}
    >
      <div className="w-[50%] flex justify-end ml-[50%]">
        <Plus
          onClick={toggleArtistView}
          className={`rotate-45 text-2xl right-0 m-5 my-5 isMobileOrTablet:m-0 isMobileOrTablet:my-1 cursor-pointer ${
            currentTheme.status ? 'text-black' : `text-white`
          }`}
        />
      </div>
      <p
        className={`text-left font-extrabold text-3xl ${
          currentTheme.status ? 'text-black' : `text-white`
        }`}
      >
        Artist
      </p>
      <div className="flex pt-0 items-center">
        <div>
          <img
            src={artist.artist_profile}
            alt={artist.artist_name}
            className="object-cover rounded-lg w-40 h-40 isMobileOrTablet:w-[8rem] isMobileOrTablet:h-[8rem]"
          />
        </div>
        <div className="pl-5 text-left">
          <p
            className={`m-0 text-3xl isMobileOrTablet:text-2xl font-semibold ${
              currentTheme.status ? 'text-black' : `text-white`
            }`}
          >
            {artist.artist_name}
          </p>
          <p className="m-0 text-xs text-gray-500">
            {artistSongs.length} songs
          </p>
          <div
            className={`flex  mt-2 ${
              isMobile
                ? 'flex-col items-start'
                : 'ustify-between items-center'
            }`}
          >
            <p className="m-0 bg-blue-500 w-fit px-3 py-1 rounded-full isMobileOrTablet:text-xs">
              {artist.likes} funs
            </p>
            <p
              className={`m-0 bg-blue-500 w-fit px-3 py-1 rounded-full isMobileOrTablet:text-xs ${
                isMobile ? 'ml-0 mt-2' : 'ml-2'
              }`}
            >
              {artistSongsDetails.streams.time}{' '}
              {artistSongsDetails.streams.units} of streaming
            </p>
          </div>
        </div>
      </div>
      <p
        className={`text-left pt-5 font-extrabold text-3xl ${
          currentTheme.status ? 'text-black' : `text-white`
        }`}
      >
        Songs
      </p>
      {!isMobile && (
        <ul className="flex justify-between items-center bg-blue-500 py-2 px-1 rounded-sm">
          <li className="m-0">Cover</li>
          <li className="m-0">Type</li>
          <li className="m-0">Label</li>
          <li className="m-0">Streaming Price</li>
          <li className="m-0">Stream</li>
        </ul>
      )}
      <div>
        {artistSongs.map((song) => {
          return (
            <div
              key={song.id}
              className="flex justify-between items-center py-2 border-b border-l-blue-500 isMobileOrTablet:text-xs"
            >
              <div className="flex items-center">
                <img
                  src={song.coverUrl}
                  alt={song.songTitle}
                  className="w-16 rounded-lg"
                />
                <p
                  className={`px-4 ${
                    currentTheme.status ? 'text-black' : `text-white`
                  }`}
                >
                  {song.songTitle}
                </p>
              </div>
              {!isMobile && (
                <p
                  className={`${
                    currentTheme.status
                      ? 'text-black'
                      : `text-gray-500`
                  }`}
                >
                  {song.genre}
                </p>
              )}
              {!isMobile && (
                <p
                  className={`${
                    currentTheme.status
                      ? 'text-black'
                      : `text-gray-500`
                  }`}
                >
                  {song.label}
                </p>
              )}
              <p
                className={`m-0 flex items-center ${
                  currentTheme.status ? 'text-black' : `text-gray-500`
                }`}
              >
                {song.streamingPrice} ETH
                <Ethereum className="mx-2 bg-blue-500 px-2 py-2 text-3xl text-black rounded-full" />
              </p>

              {readyToBeStreamed && songToStreamId === song.id ? (
                <div>
                  <PlayPauseButton
                    isPlaying={isPlaying}
                    onPlayPauseClick={() => setIsPlaying(!isPlaying)}
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
                  onClick={async () => {
                    await payStream(song.streamingPrice, song.id);
                    onClickStream(song);
                  }}
                  className={`px-4 ${
                    currentTheme.status ? 'text-black' : `text-white`
                  }`}
                >
                  Stream Now
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

FollowedArtistView.propTypes = {
  artist: PropTypes.object.isRequired,
  toggleArtistView: PropTypes.func.isRequired,
};

export default FollowedArtistView;
