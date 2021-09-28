import React from 'react';
import { Modal, ModalBody, Nav } from 'reactstrap';

import {
  selectIsModalOpen,
  selectModalContent,
  selectToggleModal,
  useGlobalStore
} from '../lib/store';

import MailViewer from './Mail/Viewer';
import StableLogo from './StableLogo';

/**
 * main client/server app
 */
const App = () => {
  const isModalOpen = useGlobalStore(selectIsModalOpen);
  const modalContent = useGlobalStore(selectModalContent);
  const toggleModal = useGlobalStore(selectToggleModal);

  return (
    <>
      <Nav className="border-bottom py-2 px-4 mb-4" tag="header">
        <StableLogo />
      </Nav>
      <MailViewer />
      <Modal isOpen={isModalOpen} size="lg" toggle={toggleModal}>
        <ModalBody>{modalContent}</ModalBody>
      </Modal>
    </>
  );
};

export default App;
