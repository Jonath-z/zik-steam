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
  setReadyToBeStreamed: () => null,
  setIsPlayed: () => null,
  payStream: async () => null,
  updateStreamingTime: async () => null,
};

const StreamContext = createContext(defaultContext);
export const useStream = () => useContext(StreamContext);

const StreamProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [songId, setSongId] = useState();
  const [duration, setDuration] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  const [readyToBeStreamed, setReadyToBeStreamed] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [getPayementError, setGetPayementError] = useState(false);
  const [isOnStreaming, setIsOnStreaming] = useState(false);

  const updateStreamingTime = useCallback(async () => {
    if (!isPlayed && songCurrentTime > 0)
      await axios.put('/api/update/streamTime', {
        userId: userId,
        songId: songId,
        streamedTime: songCurrentTime,
      });
  }, [isPlayed, duration, songId, userId]);

  useEffect(() => {
    updateStreamingTime();
  }, [updateStreamingTime]);

  const payStream = async (price) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      marketAddress,
      market_ABI,
      signer,
    );

    const formatedSongPrice = ethers.utils.parseUnits(
      price.toString().trim(),
      'ether',
    );

    try {
      const transaction = await contract.payStreaming(songId, {
        value: formatedSongPrice,
      });
      await transaction.wait();
      setReadyToBeStreamed(true);
      setGetPayementError(false);
    } catch (error) {
      console.log('error', error);
      setGetPayementError(true);
      setReadyToBeStreamed(false);
    }
  };

  return (
    <StreamContext.Provider
      value={{
        setUserId,
        setSongId,
        setDuration,
        setSongCurrentTime,
        setReadyToBeStreamed,
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
