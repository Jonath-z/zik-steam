import React from 'react';
import icons from '../../../../icons';
import PropTypes from 'prop-types';

const MenuIcon = ({ toggleMenu, isMenuDisplayed }) => {
  const { Plus, Menu } = icons;
  return (
    <div className="my-[0.89rem]">
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

MenuIcon.propTypes = {
  toggleMenu: PropTypes.func,
  isMenuDisplayed: PropTypes.bool,
};

export default MenuIcon;
