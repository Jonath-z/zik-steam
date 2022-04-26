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
import LocalStorage from '../../utils/helpers/localStorage';

const defaultContext = {
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
  const [readyToBeStreamed, setReadyToBeStreamed] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [getPayementError, setGetPayementError] = useState(false);
  const userId = LocalStorage.get('zik-stream-user-uuid');

  const updateStreamingTime = async (songId, currentTime) => {
    await axios.put('/api/update/streamTime', {
      userId: userId,
      songId: songId,
      streamedTime: currentTime,
    });
  };

  const payStream = async (price, songId) => {
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
