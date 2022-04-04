import React, {
  useState,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { marketAddress, market_ABI } from '../../../config';
import PropTypes from 'prop-types';
import previewImage from '../../assets/images/stream-vector.png';
import axios from 'axios';

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: process.env.IPFS_AUTH,
  },
});

const defaultContext = {
  onCoverfileChange: () => null,
  onSongTitleChange: () => null,
  onArtistLabelChange: () => null,
  onSongArtistChange: () => null,
  onSongGenreChange: () => null,
  onSongPriceChange: () => null,
  onSongSupportPriceChange: () => null,
  onTrackfileChange: () => null,
  createSong: () => null,
  isReadyForUploading: false,
  isSuccessfullyUploaded: false,
  setIsSuccessFullyUploaded: () => null,
  songDataPreview: {
    title: '',
    artist: '',
    image: '',
    audioSrc: '',
    type: '',
  },
};

const UploadSongContext = createContext(defaultContext);
export const useUploadSong = () => useContext(UploadSongContext);

const UploadSongProvider = ({ children }) => {
  const [coverUrl, setCoverUrl] = useState('');
  const [trackUrl, setTrackUrl] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songGenre, setSongGenre] = useState('');
  const [ArtistLabel, setArtistLabel] = useState('');
  const [songPrice, setSongPrice] = useState(0);
  const [songSupportPrice, setSongSupportPrice] = useState(0);
  const [isReadyForUploading, setIsReadyForUploading] =
    useState(false);
  const [isSuccessfullyUploaded, setIsSuccessFullyUploaded] =
    useState(false);
  const [songDataPreview, setSongDataPreview] = useState({
    title: '',
    artist: '',
    image: '',
    audioSrc: '',
    type: '',
  });

  const onTrackfileChange = useCallback(async (event) => {
    const file = event.target.files[0];
    console.log(file);
    const added = await client.add(file, {
      progress: (prog) => console.log(prog),
    });
    console.log('added', added);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log(url);
    setTrackUrl(url);
    setSongDataPreview({
      title: file.name,
      artist: 'unknown',
      image: previewImage,
      audioSrc: url,
      type: file.type,
    });
  }, []);

  const onCoverFileChange = useCallback(async (event) => {
    const file = event.target.files[0];
    console.log('cover', file);
    const added = await client.add(file, {
      progress: (prog) => console.log(prog),
    });
    console.log('added', added);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log(url);
    setCoverUrl(url);
  }, []);

  const onSongTitleChange = useCallback((event) => {
    setSongTitle(event.target.value);
  }, []);

  const onSongArtistChange = useCallback((event) => {
    setSongArtist(event.target.value);
  }, []);

  const onSongGenreChange = useCallback((event) => {
    setSongGenre(event.target.value);
  }, []);

  const onArtistLabelChange = useCallback((event) => {
    setArtistLabel(event.target.value);
  }, []);

  const onSongPriceChange = useCallback(async (event) => {
    setSongPrice(event.target.value);
  }, []);

  const onSongSupportPriceChange = useCallback(async (event) => {
    setSongSupportPrice(event.target.value);
  }, []);

  const createSong = async () => {
    if (
      !coverUrl ||
      !songArtist ||
      !songTitle ||
      !songPrice ||
      !songSupportPrice
    )
      return;
    const songMetadata = JSON.stringify({
      songTitle,
      songArtist,
      songGenre,
      ArtistLabel,
      coverUrl,
      trackUrl,
    });

    const added = await client.add(songMetadata, {
      progress: (prog) => console.log(prog),
    });

    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    const songId = await uploadSongOnBlockchain(url);
    ////////////// dummy name ////////////////////////
    updateUserSongOnMongodb(songId, 'Joathan');
  };

  const updateUserSongOnMongodb = async (songId, user) => {
    const song = {
      user: user,
      songId: songId,
      likes: 0,
      streamNumber: 0,
      streamHours: 0,
      isBestStreamed: false,
    };
    await axios.post('/api/upload', { song });
  };

  const uploadSongOnBlockchain = async (url) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      marketAddress,
      market_ABI,
      signer,
    );

    const listingFee = await contract.getListingFee();
    const formatedListingFee = listingFee.toString();
    const formatedSongPrice = ethers.utils.parseUnits(
      songPrice.trim(),
      'ether',
    );
    const formatedSupportPrice = ethers.utils.parseUnits(
      songSupportPrice.trim(),
      'ether',
    );

    const uploading = await contract.uploadSong(
      url,
      formatedSongPrice,
      formatedSupportPrice,
      {
        value: formatedListingFee,
      },
    );
    const transaction = await uploading.wait();
    const event = transaction.events[0];
    const songId = event.args[0].toNumber();

    setCoverUrl('');
    setArtistLabel('');
    setSongArtist('');
    setSongGenre('');
    setSongPrice('');
    setSongSupportPrice('');
    setSongTitle('');
    setIsReadyForUploading(false);
    setIsSuccessFullyUploaded(true);

    return songId;
  };

  return (
    <UploadSongContext.Provider
      value={{
        onCoverFileChange,
        onTrackfileChange,
        onSongTitleChange,
        onArtistLabelChange,
        onSongArtistChange,
        onSongGenreChange,
        onSongPriceChange,
        onSongSupportPriceChange,
        createSong,
        isReadyForUploading,
        isSuccessfullyUploaded,
        coverUrl,
        songDataPreview,
        setIsSuccessFullyUploaded,
      }}
    >
      {children}
    </UploadSongContext.Provider>
  );
};

UploadSongProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UploadSongProvider;
