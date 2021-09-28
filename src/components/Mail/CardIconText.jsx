import React from 'react';
import PropTypes from 'prop-types';
import { CardText } from 'reactstrap';

import StableIcon from '../StableIcon';

/**
 * an icon accompanied by some text for mail cards
 *
 * @param {object} props - component props
 * @param {string} props.iconType - stable icon type
 * @param {string} props.text - text to render
 * @returns {React.Component} mail card icon text component
 */
const MailCardIconText = ({ iconType, text }) => (
  <CardText className="d-flex align-items-center mb-2 text-secondary">
    <StableIcon className="mr-2" type={iconType} />
    <small>{text}</small>
  </CardText>
);
MailCardIconText.propTypes = {
  iconType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default MailCardIconText;
