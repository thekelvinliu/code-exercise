import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'reactstrap';

import { SUMMARY_COPY as COPY } from './static-copy';

/**
 * a summary of all mail
 *
 * @param {object} props - component props
 * @param {number} props.countPerPage - number of mail items shown on each page
 * @param {boolean} props.isLoading - loading state indicator
 * @param {number} props.page - current page
 * @param {Function} props.setPage - function to update current page
 * @param {number} props.total - total number of mail items
 * @returns {React.Component} mail summary component
 */
const MailSummary = ({ countPerPage, isLoading, page, setPage, total }) => {
  // button disabled states
  const prevIsDisabled = page === 0;
  const nextIsDisabled = countPerPage * (page + 1) >= total;

  // button handlers
  const decPage = React.useCallback(() => setPage(page - 1), [page, setPage]);
  const incPage = React.useCallback(() => setPage(page + 1), [page, setPage]);

  return (
    <Row className="align-items-center mb-4 mt-2" noGutters>
      <span className="text-secondary">
        <strong>{isLoading ? '???' : total}</strong>
        &nbsp;
        {total === 1 ? COPY.UNIT : COPY.UNITS}
      </span>
      <Button
        className="ml-auto"
        color="secondary"
        disabled={prevIsDisabled}
        outline
        onClick={decPage}
      >
        Previous
      </Button>
      <Button
        className="ml-2"
        color="secondary"
        disabled={nextIsDisabled}
        outline
        onClick={incPage}
      >
        Next
      </Button>
    </Row>
  );
};
MailSummary.propTypes = {
  countPerPage: PropTypes.number,
  isLoading: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
  total: PropTypes.number
};

export default MailSummary;
