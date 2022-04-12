import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import PropTypes from 'prop-types';
import { marketAddress, market_ABI } from '../../../config';

const defaultContext = {
  setUserId: '',
  setSongId: 0,
  setSongPrice: 0,
  setSongTotalTime: 0,
  getPayementError: false,
  readyToBeStreamed: false,
  setSongCurrentTime: () => null,
  setIsSongPaused: () => null,
  payStream: async () => null,
  updateStreamingTime: async () => null,
};

const StreamContext = createContext(defaultContext);
export const useStream = () => useContext(StreamContext);

const StreamProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [songId, setSongId] = useState();
  const [songPrice, setSongPrice] = useState(0);
  const [songTotalTime, setSongTotalTime] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  const [readyToBeStreamed, setReadyToBeStreamed] = useState(false);
  const [isOnStreaming, setIsOnStreaming] = useState(false);
  const [isSongPaused, setIsSongPaused] = useState(false);
  const [getPayementError, setGetPayementError] = useState(false);

  const updateStreamingTime = async () => {
    if (isSongPaused)
      await axios.put('/api/update/streamTime', {
        userId: userId,
        songId: songId,
        streamedTime: songCurrentTime,
      });
  };

  const handleStreaming = () => {
    console.log('current time', songCurrentTime);
    console.log('song total time', songTotalTime);
    if (readyToBeStreamed)
      if (songCurrentTime < songTotalTime) {
        setIsOnStreaming(true);
      } else if (songCurrentTime === songTotalTime) {
        updateStreamingTime();
        setIsOnStreaming(false);
        setReadyToBeStreamed(false);
      }
  };

  const payStream = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      marketAddress,
      market_ABI,
      signer,
    );
    setReadyToBeStreamed(false);

    console.log('type of price', typeof songPrice);

    const formatedSongPrice = ethers.utils.parseUnits(
      songPrice.toString().trim(),
      'ether',
    );
    if (!isOnStreaming) {
      try {
        const streamPayement = await contract.streamSong(songId, {
          value: formatedSongPrice,
        });

        await streamPayement.wait();
        setReadyToBeStreamed(true);
        handleStreaming();
        setGetPayementError(false);
      } catch {
        setGetPayementError(true);
        setReadyToBeStreamed(false);
      }
    }
  };

  return (
    <StreamContext.Provider
      value={{
        setUserId,
        setSongId,
        setSongPrice,
        setSongTotalTime,
        setSongCurrentTime,
        setIsSongPaused,
        getPayementError,
        payStream,
        updateStreamingTime,
        readyToBeStreamed,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};

StreamProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StreamProvider;
