import React, { useState } from 'react';
import { Table } from '../Table';
import { AddButton } from '../Button';
import { RestaurantAdd } from '../Restaurant';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/core';

const Dashboard: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <Table />
      <AddButton handleClick={() => setOpenDialog(true)} />
      {openDialog && (
        <Modal isOpen={openDialog} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a Restaurant</ModalHeader>
            <ModalCloseButton onClick={() => setOpenDialog(false)} />
            <ModalBody>
              <RestaurantAdd closeDialog={() => setOpenDialog(false)} />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
