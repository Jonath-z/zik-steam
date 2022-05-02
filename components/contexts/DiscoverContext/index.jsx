import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { ethers } from 'ethers';
import { marketAddress, market_ABI } from '../../../config';
import axios from 'axios';
import { useUser } from '../UserContext';
import PropTypes from 'prop-types';
import LocalStorage from '../../utils/helpers/localStorage';

const defaultContext = {
  artists: [],
  songByGenre: [],
  allSong: [],
  isLoading: true,
  updateSongs: () => null,
};

const DiscoverContext = createContext(defaultContext);
export const useDiscover = () => useContext(DiscoverContext);

const DiscoverProvider = ({ children }) => {
  const [artists, setArtits] = useState([]);
  const [songByGenre, setSongByGenre] = useState([]);
  const [allSong, setAllSong] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterArtistsByName = useCallback((songs) => {
    const allArtistNames = songs.map((song) => {
      return song.artistName;
    });
    const artistNames = [...new Set(allArtistNames)];
    setArtits(artistNames);
  }, []);

  const filterSongByGenre = useCallback(async (songs) => {
    const userId = LocalStorage.get('zik-stream-user-uuid');
    setIsLoading(true);
    const songRefs = await axios.post('/api/song/getAllSongs', {
      userId: userId,
    });
    setIsLoading(false);

    const allSongsGenre = songs.map((song) => {
      return song.genre;
    });

    const songsGenre = [...new Set(allSongsGenre)];
    if (songRefs && songRefs.data.allSongs) {
      const songsSortedByGenre = songsGenre.map((songGenre) => {
        let sortCollection = [];
        songRefs.data.allSongs.map((songRef) => {
          songs.map((song) => {
            if (
              song.genre === songGenre &&
              song.id === songRef.songId
            ) {
              const { likes, streamHours, streamNumber, isLiked } =
                songRef;
              const songData = {
                ...song,
                likes,
                streamHours,
                streamNumber,
                isLiked,
              };
              sortCollection.push(songData);
            }
          });
        });
        return {
          genre: songGenre,
          songs: sortCollection,
        };
      });
      setSongByGenre(songsSortedByGenre);
    }
  }, []);

  const getAllSongs = useCallback(async () => {
    const url =
      process.env.NODE_ENV === 'production'
        ? 'https://rinkeby.infura.io/v3/860ca51e15d0418f9e49cc4a75f393f0'
        : 'http://127.0.0.1:8545/';
    const provider = new ethers.providers.JsonRpcProvider(url);

    const contract = new ethers.Contract(
      marketAddress,
      market_ABI,
      provider,
    );

    setIsLoading(true);
    const allSongs = await contract.getSongs();
    const songs = await Promise.all(
      allSongs.map(async (song) => {
        const meta = (await axios.get(song.metadata)).data;
        const streamingPrice = ethers.utils.formatUnits(
          song.price.toString(),
          'ether',
        );
        const supportPrice = ethers.utils.formatUnits(
          song.supportPrice.toString(),
          'ether',
        );
        const id = song.id.toNumber();

        const songItem = {
          id,
          streamingPrice,
          supportPrice,
          songUrl: meta.trackUrl,
          songTitle: meta.songTitle,
          artistName: meta.songArtist,
          coverUrl: meta.coverUrl,
          genre: meta.songGenre,
          label: meta.artistLabel,
        };

        return songItem;
      }),
    );
    filterArtistsByName(songs);
    filterSongByGenre(songs);
    setAllSong(songs);
    setIsLoading(false);
  }, [filterArtistsByName, filterSongByGenre]);

  useEffect(() => {
    getAllSongs();
  }, [getAllSongs]);

  const updateSongs = () => {
    getAllSongs();
  };

  return (
    <DiscoverContext.Provider
      value={{
        artists,
        songByGenre,
        isLoading,
        updateSongs,
        allSong,
      }}
    >
      {children}
    </DiscoverContext.Provider>
  );
};

DiscoverProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DiscoverProvider;
