import React, { useState } from 'react';
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
    onSongOwnerChange,
    songUploadProgress,
    coverUploadProgress,
    createSong,
    isSuccessfullyUploaded,
    isCorrectImageSize,
    songDataPreview,
    onTrackfileChange,
    coverUrl,
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

  console.log('cover progress', coverUploadProgress);
  console.log('song progress', songUploadProgress);

  return (
    <>
      {isSuccessfullyUploaded && <div>SuccessFully Uploaded </div>}
      <Row className="flex flex-col justify-center">
        <Col>
          <Space direction="vertical">
            <label htmlFor="song">Song </label>
            <Input
              type="file"
              name="song"
              placeholder="Upload Song"
              onChange={onTrackfileChange}
              className={`bg-[#00C3FF] bg-opacity-[${songUploadProgress}]`}
            />
            <span
              className={`bg-[#00C3FF] w-[${songUploadProgress}%]`}
            ></span>
            <label htmlFor="cover">Cover </label>
            <Input
              type="file"
              name="cover"
              placeholder="Upload Song"
              onChange={onCoverFileChange}
              className={`bg-[#00C3FF] bg-opacity-[${coverUploadProgress}]`}
            />
            <span
              className={`bg-[#030e12] w-[${songUploadProgress}%]`}
            ></span>
            {!isCorrectImageSize && (
              <p>Song cover must have a square size</p>
            )}
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
              placeholder="Genre (required)"
              onChange={onSongGenreChange}
            />
            <label htmlFor="label">Artist Lalbel</label>
            <Input
              type="text"
              name="label"
              placeholder="label (Optional)"
              onChange={onArtistLabelChange}
            />
            <label htmlFor="owner">Owner wallet address</label>
            <Input
              type="text"
              name="owner"
              placeholder="Addres (required)"
              onChange={onSongOwnerChange}
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
        </Col>
      </Row>
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
          setDuration={() => 0}
          setSongCurrentTime={() => 0}
        />
      )}
    </>
  );
};

export default UploadSong;
