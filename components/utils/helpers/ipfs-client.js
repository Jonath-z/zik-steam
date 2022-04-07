import { create as ipfsHttpClient } from 'ipfs-http-client';

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: process.env.IPFS_AUTH,
  },
});
export default client;
