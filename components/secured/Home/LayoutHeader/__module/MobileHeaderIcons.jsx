import React, { useState } from 'react';
import icons from '../../../../icons';
import PropTypes from 'prop-types';

const MobileHeaderIcons = ({
  toggleMenu,
  isMenuDisplayed,
  toggleSearchBar,
}) => {
  const { Plus, Menu, Search, SearchOff } = icons;
  const [isSeachOff, setIsSearchOff] = useState();
  return (
    <div className="my-[1rem] flex">
      {isSeachOff ? (
        <SearchOff
          className="text-blue-500 text-3xl mx-1"
          onClick={() => setIsSearchOff(toggleSearchBar())}
        />
      ) : (
        <Search
          className="text-blue-500 text-3xl mx-1"
          onClick={() => setIsSearchOff(toggleSearchBar())}
        />
      )}
      {!isMenuDisplayed ? (
        <Menu
          className="text-blue-500 text-3xl"
          onClick={toggleMenu}
        />
      ) : (
        <Plus
          className="text-blue-500 text-3xl transition-transfrom ease-in-out duration-500  rotate-45 "
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

MobileHeaderIcons.propTypes = {
  toggleMenu: PropTypes.func,
  toggleSearchBar: PropTypes.func,
  isMenuDisplayed: PropTypes.bool,
};

export default MobileHeaderIcons;
