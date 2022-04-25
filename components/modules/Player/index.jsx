import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PropTypes from 'prop-types';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { useStream } from '../../contexts/StreamContext';

import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';

const Player = ({ tracks }) => {
  const { setIsPlaying } = useAudioPlayer();
  const { updateStreamingTime } = useStream();

  console.log('song tracks', tracks);
  return (
    <div>
      {' '}
      <ReactJkMusicPlayer
        audioLists={[{ src: tracks[0].audioSrc }]}
        autoHiddenCover={true}
        preload={true}
        glassBg={true}
        showProgressLoadBar={true}
        showMediaSession={true}
        theme="dark"
        showDownload={false}
      />
      {/* <AudioPlayer
        autoPlay
        src={tracks[0].audioSrc}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={(e) =>
          updateStreamingTime(tracks[0].id, e.target.currentTime)
        }
        listenInterval={1}
      /> */}
    </div>
  );
};

Player.propTypes = {
  tracks: PropTypes.array,
};

export default Player;
