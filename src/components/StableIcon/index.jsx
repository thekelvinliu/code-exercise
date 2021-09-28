import React from 'react';
import PropTypes from 'prop-types';

import company from './company.svg';
import forward from './forward.svg';
import processing from './processing.svg';
import recipient from './recipient.svg';
import scan from './scan.svg';
import shred from './shred.svg';

const ICON_SET = {
  company,
  forward,
  processing,
  recipient,
  scan,
  shred
};

/**
 * multi-icon component for stable icons
 *
 * @param {object} props - component props
 * @param {string} props.className - class names
 * @param {string} props.size - size of icon (default: 1.5rem)
 * @param {string} props.type - type of icon
 * @returns {React.Component} icon component
 */
const StableIcon = ({ className, type, size = '1.5rem' }) => {
  const icon = ICON_SET[type];
  if (!icon) {
    return null;
  }

  const style = {
    height: size,
    width: size
  };
  return <img className={className} alt={`${type} icon`} src={icon} style={style} />;
};
StableIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(ICON_SET)).isRequired
};

export default StableIcon;
