/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LocalStorage from '../../../../../../utils/helpers/localStorage';
import icons from '../../../../../../icons';

const FavoriteArtists = () => {
  const { Loading } = icons;
  const [favoritesArtists, setFavoritesArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavoritesSongs = useCallback(async () => {
    setIsLoading(true);
    const id = LocalStorage.get('zik-stream-user-uuid');
    const response = await axios.post(
      '/api/artist/getFavoriteArtists',
      {
        userId: id,
      },
    );

    console.log('my artist ', response);

    if (response.status === 200) {
      setFavoritesArtists(response.data.favoriteArtists);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavoritesSongs();
  }, [loadFavoritesSongs]);

  if (isLoading)
    return (
      <div className="w-full flex justify-center mt-5">
        <Loading className="animate-spin text-4xl text-blue-500 text-center" />
      </div>
    );

  if (!isLoading && favoritesArtists.length === 0)
    return (
      <div className="w-full flex justify-center mt-5">
        <p className="text-3xl flex flex-col justify-center">
          <span className="text-center text-5xl py-4">🙁</span>
          <span>No Followed Artist found</span>
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-6">
      {favoritesArtists.map((artist, index) => {
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
                >
                  Get Songs
                </button>
              </div>
            </div>
            <p className="py-3 text-center">{artist.artist_name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteArtists;
