/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import icons from '../../../../../../icons';
import LocalStorage from '../../../../../../utils/helpers/localStorage';

const AllArtists = () => {
  const { Loading } = icons;
  const [isLoading, setIsLoading] = useState(true);
  const [allArtists, setAllArtists] = useState([]);
  const id = LocalStorage.get('zik-stream-user-uuid');

  const loadAllArtists = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.post('/api/artist/getAllArtists', {
      userId: id,
    });
    if (response.status === 200) {
      console.log('all Artist', response);
      setAllArtists(response.data.allArtists);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllArtists();
  }, [loadAllArtists]);

  const followArtist = async (artist) => {
    const response = await axios.put(
      '/api/update/addFavoriteArtist',
      {
        userId: id,
        artist,
      },
    );

    if (response.status === 200) loadAllArtists();
  };

  if (isLoading)
    return (
      <div className="w-full flex justify-center mt-5">
        <Loading className="animate-spin text-4xl text-blue-500 text-center" />
      </div>
    );

  if (!isLoading && allArtists.length === 0)
    return (
      <div className="w-full flex justify-center mt-5">
        <p className="text-3xl flex flex-col justify-center">
          <span className="text-center text-5xl py-4">🙁</span>
          <span>No Artist you may need to discover found</span>
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-6">
      {allArtists.map((artist, index) => {
        return (
          <div key={index} className="text-center">
            <div className="w-80 h-80 relative">
              <img
                src={artist.artist_profile}
                alt={artist.artist_name}
                className="object-cover rounded-full w-80 h-80"
              />
              <div
                className="absolute w-full rounded-full h-full top-0 l
                            eft-0 right-0 bottom-0 flex justify-center
                            items-center bg-black transition ease-in-out delay-150 bg-opacity-0 opacity-0
                            hover:bg-opacity-50 hover:opacity-100 cursor-pointer"
              >
                <button
                  className="bg-blue-500 flex 
                             items-center text-white px-3 py-2
                             bg-opacity-100 rounded-md"
                  onClick={() => followArtist(artist)}
                >
                  Follow
                </button>
              </div>
            </div>
            <p className="py-3 text-center text-gray-500">
              {artist.artist_name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AllArtists;
