import React from 'react';
import { useDiscover } from '../../../contexts/DiscoverContext';
import AudioPlayer from '../../../modules/AudioPlayer';

const Discover = () => {
  const { artists, songByGenre, isLoading } = useDiscover();
  console.log('artist', artists);
  console.log('genre', songByGenre);
  return (
    <div>
      <h1>Artists</h1>
      <div>
        {artists.map((artist, index) => {
          return <p key={`artits-${index}`}>{artist}</p>;
        })}
      </div>
      <div>
        {songByGenre.map((song, index) => {
          return (
            <div key={index}>
              <h1>{song.genre}</h1>
              {song.songs.map((song, index) => {
                return (
                  <div key={index}>
                    <AudioPlayer
                      tracks={[
                        {
                          title: song.songTitle,
                          image: song.coverUrl,
                          artist: song.artistName,
                          audioSrc: song.songUrl,
                        },
                      ]}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;
