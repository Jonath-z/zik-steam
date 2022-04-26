/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useStream } from '../../../contexts/StreamContext';
import AudioPlayer from '../../../modules/AudioPlayer';
import { useAudioPlayer } from '../../../contexts/AudioPlayerContext';
import LocalStorage from '../../../utils/helpers/localStorage';
import PlayPauseButton from '../../../modules/AudioPlayer/AudioControls/PlayPauseButton';
import icons from '../../../icons';
import LoadingFallback from '../../../modules/LoadingFallback';

const FavoriteTracks = () => {
  const { Plus, Ethereum } = icons;
  const { isPlaying, setIsPlaying } = useAudioPlayer();
  const {
    // setSongId,
    readyToBeStreamed,
    setDuration,
    setSongCurrentTime,
    payStream,
  } = useStream();
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [isFavoriteTracksLoading, setIsFavoriteTracksLoading] =
    useState(true);
  const [songToStreamId, setSongToStreamId] = useState('');
  const id = LocalStorage.get('zik-stream-user-uuid');

  const loadFavoriteTracks = useCallback(async () => {
    setIsFavoriteTracksLoading(true);
    const response = await axios.post('/api/song/getfavoriteSongs', {
      userId: id,
    });

    setFavoriteTracks(response.data.favoriteSongs);
    setIsFavoriteTracksLoading(false);
  }, [id]);

  useEffect(() => {
    loadFavoriteTracks();
  }, [loadFavoriteTracks]);

  const onClickStream = async (track) => {
    // setSongId(track.id);
    setSongToStreamId(track.id);
    setTracks([
      {
        title: track.songTitle,
        image: track.coverUrl,
        artist: track.artistName,
        audioSrc: track.songUrl,
      },
    ]);
  };

  if (isFavoriteTracksLoading) return <LoadingFallback />;

  if (!isFavoriteTracksLoading && favoriteTracks.length === 0)
    return (
      <div className="w-full flex justify-center mt-5">
        <p className="text-3xl flex flex-col justify-center">
          <span className="text-center text-5xl py-4">🙁</span>
          <span>No Favorite Tracks found</span>
        </p>
      </div>
    );

  return (
    <div>
      <p className="text-left pt-5 font-extrabold text-3xl">
        Favorite Tracks
      </p>
      <ul className="flex justify-between items-center bg-blue-500 py-2 px-1 rounded-sm">
        <li className="m-0">Cover</li>
        <li className="m-0">Type</li>
        <li className="m-0">Label</li>
        <li className="m-0">Streaming Price</li>
        <li className="m-0">Stream</li>
      </ul>
      {favoriteTracks.map((track) => {
        return (
          <div
            key={track.id}
            className="flex justify-between items-center py-2 border-b border-l-blue-500"
          >
            <div className="flex items-center">
              <img
                src={track.coverUrl}
                alt={track.songTitle}
                className="w-16 rounded-lg"
              />
              <p className="px-4">{track.songTitle}</p>
            </div>
            <p>{track.genre}</p>
            <p>{track.label}</p>
            <p className="m-0 flex items-center">
              {track.streamingPrice} ETH
              <Ethereum className="mx-2 bg-blue-500 px-2 py-2 text-3xl text-black rounded-full" />
            </p>

            {readyToBeStreamed && songToStreamId === track.id ? (
              <div>
                <PlayPauseButton
                  isPlaying={isPlaying}
                  onPlayPauseClick={() => setIsPlaying(!isPlaying)}
                  setTracks={() =>
                    setTracks([
                      {
                        title: track.songTitle,
                        image: track.coverUrl,
                        artist: track.artistName,
                        audioSrc: track.songUrl,
                      },
                    ])
                  }
                />
              </div>
            ) : (
              <button
                onClick={async () => {
                  onClickStream(track);
                  await payStream(track.streamingPrice);
                }}
              >
                Stream Now
              </button>
            )}
          </div>
        );
      })}
      {tracks.length !== 0 && readyToBeStreamed && (
        <AudioPlayer
          tracks={tracks}
          setSongCurrentTime={setSongCurrentTime}
          setDuration={setDuration}
        />
      )}
    </div>
  );
};

export default FavoriteTracks;
