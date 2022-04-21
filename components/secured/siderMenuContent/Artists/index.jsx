import React, { useState } from 'react';
import AllArtists from './AllArtists';
import { Input, Col } from 'antd';
import FavoriteArtists from './FavoriteArtists';

const Artist = () => {
  const [isDiscoverArtist, setIsDiscoverArtist] = useState(true);

  return (
    <div>
      <div className="flex border-b w-full border-gray-300 mr-10 fixed bg-[#f0f2f5]">
        <p
          className={`${
            isDiscoverArtist &&
            'border-blue-500 border-b-4 font-extrabold'
          } pb-5 my-0 cursor-pointer transition-all`}
          onClick={() => setIsDiscoverArtist(true)}
        >
          Discover artists
        </p>
        <p
          className={`mx-4 pb-5 my-0 cursor-pointer transition-all ${
            !isDiscoverArtist &&
            'border-blue-500 border-b-4 font-extrabold'
          }`}
          onClick={() => setIsDiscoverArtist(false)}
        >
          My followed artists
        </p>
      </div>
      <div className="py-20">
        {isDiscoverArtist ? <AllArtists /> : <FavoriteArtists />}
      </div>
    </div>
  );
};

export default Artist;
