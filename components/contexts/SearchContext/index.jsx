import React, {
  useCallback,
  useState,
  useContext,
  createContext,
} from 'react';
import PropTypes from 'prop-types';

const defaultContext = {
  onInputChange: () => null,
  setSongList: () => null,
};

const SearchContext = createContext(defaultContext);
export const useSearch = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
  const [songList, setSongList] = useState([]);

  const onInputChange = useCallback(
    (event) => {
      let inputValue = event.target.value.toUpperCase();
      for (let i = 0; i < songList.length; i++) {
        const songName =
          songList[i].querySelectorAll('.song-name')[0];
        const artistName =
          songList[i].querySelectorAll('.artist-name')[0];

        if (songName !== undefined || artistName !== undefined) {
          if (
            songName.innerText.toUpperCase().indexOf(inputValue) >
              -1 ||
            artistName.innerText.toUpperCase().indexOf(inputValue) >
              -1
          ) {
            songList[i].style.display = 'block';
          } else {
            songList[i].style.display = 'none';
          }
        }
      }
    },
    [songList],
  );

  return (
    <SearchContext.Provider value={{ onInputChange, setSongList }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.element,
};

export default SearchProvider;
