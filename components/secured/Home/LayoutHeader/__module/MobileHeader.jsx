import React from 'react';
import PropTypes from 'prop-types';
import MobileHeaderIcons from './MobileHeaderIcons';
import ZikStreamLogo from '../../../../vectors/zikStreamLogo';

const MobileHeader = ({
  toggleMenu,
  isMenuDisplayed,
  toggleSearchBar,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="max-w-fit">
        <ZikStreamLogo />
      </div>
      <div>
        <MobileHeaderIcons
          toggleMenu={toggleMenu}
          isMenuDisplayed={isMenuDisplayed}
          toggleSearchBar={toggleSearchBar}
        />
      </div>
    </div>
  );
};

MobileHeader.propTypes = {
  toggleMenu: PropTypes.func,
  toggleSearchBar: PropTypes.func,
  isMenuDisplayed: PropTypes.bool,
};

export default MobileHeader;
