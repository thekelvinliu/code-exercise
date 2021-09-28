import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';

import {
  selectGetMail,
  selectIsLoadingMail,
  selectMail,
  useGlobalStore
} from '../../lib/store';

import MailGrid from './Grid';
import MailSummary from './Summary';

import { VIEWER_COPY as COPY } from './static-copy';

/**
 * load and view all mail
 *
 * @param {object} props - component props
 * @param {number} props.countPerPage - number of mail items shown on each page
 * @returns {React.Component} mail viewer component
 * @todo handle getMail error state
 */
const MailViewer = ({ className, countPerPage = 6 }) => {
  const getMail = useGlobalStore(selectGetMail);
  const isLoadingMail = useGlobalStore(selectIsLoadingMail);

  /** @type {object[]} */
  const mail = useGlobalStore(selectMail);

  // load mail from api on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getMail(), []);

  // pagination state
  const [page, setPage] = React.useState(0);

  // only render mail items for current page
  const itemsToRender = React.useMemo(() => {
    const start = page * countPerPage;
    const stop = start + countPerPage;
    return mail.slice(start, stop);
  }, [countPerPage, mail, page]);

  return (
    <Container className={`d-flex flex-column ${className}`} tag="section">
      <Row className="flex-column" noGutters>
        <h2 className="font-pt-sans">{COPY.HEAD}</h2>
        <p>{COPY.BODY}</p>
      </Row>
      <MailGrid
        className="flex-grow-1"
        isLoading={isLoadingMail}
        mail={itemsToRender}
      />
      <MailSummary
        countPerPage={countPerPage}
        isLoading={isLoadingMail}
        page={page}
        setPage={setPage}
        total={mail.length}
      />
    </Container>
  );
};
MailViewer.propTypes = {
  className: PropTypes.string,
  countPerPage: PropTypes.number
};

export default MailViewer;
