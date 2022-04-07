import React, { useState, useEffect, useCallback } from 'react';
import HomePage from '../../components/_NoAuth/Home';
import UploadSongProvider from '../../components/contexts/UploadSongContext';
import DiscoverProvider from '../../components/contexts/DiscoverContext';
import { useRouter } from 'next/router';
import axios from 'axios';

const Discover = () => {
  const [isSecured, setIsSecured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRouter();
  const { id } = route.query;

  useEffect(() => {
    const checkUserId = async () => {
      if (id) {
        setIsLoading(true);
        const response = await axios.post('/api/query/getUser', {
          id: id,
        });
        console.log(response);
        if (response.data.status === 302) {
          setIsSecured(true);
        } else {
          setIsSecured(false);
        }
      }
    };
    checkUserId();
  }, [id]);

  return (
    <UploadSongProvider>
      <DiscoverProvider>
        <HomePage isSecured={isSecured} />
      </DiscoverProvider>
    </UploadSongProvider>
  );
};

export default Discover;
