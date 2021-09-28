import React from 'react';

import logoSrc from './stable-logo.svg';

/**
 * static stable logo (svg in img)
 *
 * @returns {React.Component} stable logo
 */
const StableLogo = () => (
  <img alt="stable logo" src={logoSrc} style={{ height: '50px', width: '180px' }} />
);

export default StableLogo;
