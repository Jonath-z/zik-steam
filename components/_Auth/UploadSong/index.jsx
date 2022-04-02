import React, { useState } from 'react';
import Image from 'next/image';
import { Row, Col, Input, Button, Space } from 'antd';
import { useUploadSong } from '../../contexts/UploadSongContext';
import AudioPlayer from '../../modules/AudioPlayer';

const UploadSong = () => {
  const {
    onCoverFileChange,
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
    setIsSuccessFullyUploaded,
    songDataPreview,
    onTrackfileChange,
  } = useUploadSong();

  const isSongPreviewReady = () => {
    if (
      !songDataPreview.artist ||
      !songDataPreview.title ||
      !songDataPreview.image ||
      !songDataPreview.audioSrc
    )
      return false;
    return true;
  };

  return (
    <>
      {isSuccessfullyUploaded && <div>SuccessFully Uploaded </div>}
      <Row>
        <Col>
          <Space direction="vertical">
            <label htmlFor="song">Song </label>
            <Input
              type="file"
              name="song"
              placeholder="Upload Song"
              onChange={onTrackfileChange}
            />
            <label htmlFor="cover">Cover </label>
            <Input
              type="file"
              name="cover"
              placeholder="Upload Song"
              onChange={onCoverFileChange}
            />
            <label htmlFor="title">Song Title </label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              onChange={onSongTitleChange}
            />
            <label htmlFor="artist">Artist name</label>
            <Input
              type="text"
              name="arist"
              placeholder="Arttis name"
              onChange={onSongArtistChange}
            />
            <label htmlFor="genre">Genre</label>
            <Input
              type="text"
              name="genre"
              placeholder="Genre (Optional)"
              onChange={onSongGenreChange}
            />
            <label htmlFor="label">Artist Lalbel</label>
            <Input
              type="text"
              name="label"
              placeholder="label (Optional)"
              onChange={onArtistLabelChange}
            />

            <Col>
              <Space>
                <Row>
                  <Space direction="vertical">
                    <label htmlFor="price">Steaming Price</label>
                    <Input
                      type="number"
                      name="price"
                      placeholder="Price"
                      onChange={onSongPriceChange}
                    />
                  </Space>
                </Row>
                <Row>
                  <Space direction="vertical">
                    <label htmlFor="supportPrice">Support</label>
                    <Input
                      type="number"
                      name="supportPrice"
                      placeholder="Price for support"
                      onChange={onSongSupportPriceChange}
                    />
                  </Space>
                </Row>
              </Space>
            </Col>
            {<Button onClick={createSong}>Post the Song</Button>}
          </Space>
          {isSongPreviewReady() && (
            <AudioPlayer
              tracks={[
                {
                  title: songDataPreview.title,
                  image: songDataPreview.image,
                  artist: songDataPreview.artist,
                  audioSrc: songDataPreview.audioSrc,
                },
              ]}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default UploadSong;
