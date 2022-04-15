import React from 'react';
import UploadSong from '../components/admin/UploadSong';
import UploadSongProvider from '../components/contexts/UploadSongContext';

const Admin = () => {
  return (
    <UploadSongProvider>
      <UploadSong />
    </UploadSongProvider>
  );
};

export default Admin;
