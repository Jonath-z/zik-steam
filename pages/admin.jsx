import React from 'react';
import UploadSong from '../components/admin/UploadSong';
import UploadSongProvider from '../components/contexts/UploadSongContext';
import SEO from '../components/SEO';

const Admin = () => {
  return (
    <>
      <SEO />
      <UploadSongProvider>
        <UploadSong />
      </UploadSongProvider>
    </>
  );
};

export default Admin;
