import React, { useState, useEffect, useCallback } from 'react';
import DiscoverPage from '../../components/_NoAuth/Discover';
import UploadSongProvider from '../../components/contexts/UploadSongContext';
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
      <DiscoverPage isSecured={isSecured} />
    </UploadSongProvider>
  );
};

export default Discover;
