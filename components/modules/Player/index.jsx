import React from 'react';
import PropTypes from 'prop-types';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { useStream } from '../../contexts/StreamContext';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import { useTheme } from '../../contexts/Themecontext';

const Player = ({ tracks }) => {
  const { setIsPlaying } = useAudioPlayer();
  const { updateStreamingTime } = useStream();
  const { setCurrentTheme } = useTheme();

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
    spaceBar: true,
    onAudioPlay: () => setIsPlaying(true),
    onAudioPause: () => setIsPlaying(false),
    onAudioEnded: (currentPlayId, audioLists, audioInfo) => {
      setIsPlaying(false);
      updateStreamingTime(tracks[0].id, audioInfo.currentTime);
    },
    onThemeChange: (theme) => {
      theme === 'light'
        ? setCurrentTheme({ theme: 'light', status: true })
        : setCurrentTheme({
            theme: 'dark',
            status: false,
          });
    },
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
