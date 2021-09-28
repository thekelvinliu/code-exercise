import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import LoadingSpinner from '../LoadingSpinner';
import MailCard from './Card';

/**
 * a grid for mail cards
 *
 * @param {object} props - component props
 * @param {string} props.className - additional classes to add to component root
 * @param {boolean} props.isLoading - loading state indicator
 * @param {object[]} props.mail - mail items to render
 * @returns {React.Component} mail grid component
 */
const MailGrid = ({ className, isLoading = false, mail = [] }) => {
  return (
    <Row className={`mail-grid ${className}`}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        mail.map(item => (
          <Col key={item.id} className="mb-4" xs="12" sm="6" md="6" lg="4">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <MailCard className="flex-grow-1 h-100" {...item} />
          </Col>
        ))
      )}
    </Row>
  );
};
MailGrid.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  mail: PropTypes.arrayOf(PropTypes.shape(MailCard.propTypes))
};

export default MailGrid;
