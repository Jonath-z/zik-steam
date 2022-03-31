import React, { useState } from 'react';
import Image from 'next/image';
import { Row, Col, Input, Button, Space } from 'antd';
import { useUploadSong } from '../../contexts/UploadSongContext';
import AudioPlayer from '../../modules/AudioPlayer';
import ReactAudioPlayer from 'react-audio-player';

const UploadSong = () => {
  const {
    onCoverfileChange,
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

  isSuccessfullyUploaded &&
    setTimeout(2000, setIsSuccessFullyUploaded(false));

  const isSongPreviewReady = () => {
    if (
      !songDataPreview.artist ||
      !songDataPreview.title ||
      !songDataPreview.image ||
      !songDataPreview.audioSrc
    )
      return false;
    console.log(new Audio(songDataPreview.audioSrc));
    return true;
  };

  return (
    <>
      {isSuccessfullyUploaded && <div>SuccessFully Uploaded </div>}
      <Row>
        <Col>
          <Space direction="vertical">
            <Input
              type="file"
              placeholder="Upload cover"
              onChange={onTrackfileChange}
            />
            <Input
              type="text"
              placeholder="Title"
              onChange={onSongTitleChange}
            />
            <Input
              type="text"
              placeholder="Arttis name"
              onChange={onSongArtistChange}
            />
            <Input
              type="text"
              placeholder="Genre (Optional)"
              onChange={onSongGenreChange}
            />
            <Input
              type="text"
              placeholder="label (Optional)"
              onChange={onArtistLabelChange}
            />

            <Col>
              <Space>
                <Input
                  type="number"
                  placeholder="Price"
                  onChange={onSongPriceChange}
                />
                <Input
                  type="number"
                  placeholder="Price for support"
                  onChange={onSongSupportPriceChange}
                />
              </Space>
            </Col>
            {isReadyForUploading && (
              <Button onClick={createSong}>Post the Song</Button>
            )}
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
