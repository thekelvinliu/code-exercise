import React from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../../lib/date-time-format';

/**
 * a formatted date for mail cards
 *
 * @param {object} props - component props
 * @param {string} props.className - additional classes to add to component root
 * @param {number} props.timestamp - mail item timestamp
 * @returns {React.Component} mail card date component
 */
const MailCardDate = ({ className, timestamp }) => {
  const dateObj = React.useMemo(() => new Date(timestamp), [timestamp]);
  const formattedDate = React.useMemo(() => formatDate(dateObj), [dateObj]);

  return (
    <div className={`d-flex justify-content-end ${className}`}>
      <small className="ml-auto mr-3 my-2 text-secondary" title={dateObj.toString()}>
        {formattedDate}
      </small>
    </div>
  );
};
MailCardDate.propTypes = {
  className: PropTypes.string,
  timestamp: PropTypes.number
};

export default MailCardDate;
