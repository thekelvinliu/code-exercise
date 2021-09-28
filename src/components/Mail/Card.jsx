import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap';

import {
  selectSetModalContent,
  selectToggleModal,
  useGlobalStore
} from '../../lib/store';

import MailCardDate from './CardDate';
import MailCardIconText from './CardIconText';

import { CARD_COPY as COPY } from './static-copy';
import styles from './styles.module.css';

const isProcessing = obj => obj?.status === 'processing';

/**
 * a card that displays info about a piece of mail
 *
 * @param {object} props - component props
 * @param {string} props.className - additional classes to add to component root
 * @param {string} props.id - mail item id
 * @param {number} props.timestamp - mail item timestamp
 * @returns {React.Component} mail card component
 */
const MailCard = ({
  className,
  businessRecipient,
  forward,
  from,
  id,
  imageUrl,
  individualRecipient,
  scan,
  shred,
  timestamp
}) => {
  const setModalContent = useGlobalStore(selectSetModalContent);
  const toggleModal = useGlobalStore(selectToggleModal);
  const handleImgClick = React.useCallback(() => {
    setModalContent(
      <>
        <h5 className="font-pt-sans">{from}</h5>
        <img className="h-auto w-100" alt={id} src={imageUrl} />
      </>
    );
    toggleModal();
  }, [from, id, imageUrl, setModalContent, toggleModal]);

  return (
    <Card className={`${styles.mailCard} ${className}`}>
      <CardImg
        className={`${styles.mailCardImg} border-bottom`}
        alt={id}
        src={imageUrl}
        top
        onClick={handleImgClick}
      />
      <CardBody className="p-2">
        <CardTitle className="font-pt-sans" tag="h6">
          {from}
        </CardTitle>
        {businessRecipient && (
          <MailCardIconText iconType="company" text={businessRecipient} />
        )}
        {individualRecipient && (
          <MailCardIconText iconType="recipient" text={individualRecipient} />
        )}
        {scan && (
          <MailCardIconText
            iconType={isProcessing(scan) ? 'processing' : 'scan'}
            text={isProcessing(scan) ? COPY.SCAN_PROCESSING : COPY.SCAN_COMPLETED}
          />
        )}
        {forward && (
          <MailCardIconText
            iconType={isProcessing(forward) ? 'processing' : 'forward'}
            text={isProcessing(forward) ? COPY.FWD_PROCESSING : COPY.FWD_COMPLETED}
          />
        )}
        {shred && (
          <MailCardIconText
            iconType={isProcessing(shred) ? 'processing' : 'shred'}
            text={isProcessing(shred) ? COPY.SHRED_PROCESSING : COPY.SHRED_COMPLETED}
          />
        )}
      </CardBody>
      <MailCardDate className="border-top" timestamp={timestamp} />
    </Card>
  );
};
MailCard.propTypes = {
  className: PropTypes.string,
  businessRecipient: PropTypes.string,
  forward: PropTypes.shape({ status: PropTypes.oneOf(['completed', 'processing']) }),
  from: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  individualRecipient: PropTypes.string,
  scan: PropTypes.shape({ status: PropTypes.oneOf(['completed', 'processing']) }),
  shred: PropTypes.shape({ status: PropTypes.oneOf(['completed', 'processing']) }),
  timestamp: PropTypes.number.isRequired
};

export default MailCard;
