import React from 'react';
import PropTypes from 'prop-types';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { useStream } from '../../contexts/StreamContext';
import ReactJkMusicPlayer from 'react-jinke-music-player';
// import 'react-jinke-music-player/assets/index.css';
// import '../../../styles/custom.module.css';

const Player = ({ tracks }) => {
  const { setIsPlaying } = useAudioPlayer();
  const { updateStreamingTime } = useStream();

  console.log('song tracks', tracks);

  const options = {
    audioLists: [
      {
        name: tracks[0].title,
        singer: tracks[0].artist,
        cover: tracks[0].cover,
        musicSrc: tracks[0].audioSrc,
      },
    ],
    autoHiddenCover: true,
    preload: true,
    glassBg: true,
    showProgressLoadBar: true,
    showMediaSession: true,
    theme: 'dark',
    showDownload: false,
    responsive: true,
    onAudioPlay: () => setIsPlaying(true),
    onAudioPause: () => setIsPlaying(false),
    className: 'text-blue-500',
  };

  return (
    <div>
      {' '}
      <ReactJkMusicPlayer {...options} />
    </div>
  );
};

Player.propTypes = {
  tracks: PropTypes.array,
};

export default Player;
