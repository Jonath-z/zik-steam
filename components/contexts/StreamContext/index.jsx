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
  setDuration: 0,
  getPayementError: false,
  readyToBeStreamed: false,
  setSongCurrentTime: () => null,
  setIsPlayed: () => null,
  payStream: async () => null,
  updateStreamingTime: async () => null,
};

const StreamContext = createContext(defaultContext);
export const useStream = () => useContext(StreamContext);

const StreamProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [songId, setSongId] = useState();
  const [songPrice, setSongPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  const [readyToBeStreamed, setReadyToBeStreamed] = useState(false);
  const [isOnStreaming, setIsOnStreaming] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [getPayementError, setGetPayementError] = useState(false);

  const updateStreamingTime = useCallback(async () => {
    if (!isPlayed && songCurrentTime > 0)
      await axios.put('/api/update/streamTime', {
        userId: userId,
        songId: songId,
        streamedTime: songCurrentTime,
      });
  }, [isPlayed, duration, songId, userId]);

  const handleStreaming = useCallback(async () => {
    console.log('current time', songCurrentTime);
    console.log('song total time', duration);
    if (readyToBeStreamed)
      if (songCurrentTime < duration) {
        setIsOnStreaming(true);
      } else if (songCurrentTime === duration) {
        updateStreamingTime();
        setIsOnStreaming(false);
        setReadyToBeStreamed(false);
      }
  }, [
    songCurrentTime,
    duration,
    readyToBeStreamed,
    updateStreamingTime,
  ]);

  console.log('is song playing', isPlayed);

  useEffect(() => {
    handleStreaming();
  }, [handleStreaming]);

  useEffect(() => {
    updateStreamingTime();
  }, [updateStreamingTime]);

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
        setDuration,
        setSongCurrentTime,
        setIsPlayed,
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
