import React, { useState } from 'react';
import { Table } from '../Table';
import { AddButton } from '../Button';
import { Dialog } from '../Dialog';

const Dashboard: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <Table />
      <AddButton handleClick={() => setOpenDialog(true)} />
      {openDialog && (
        <Dialog closeDialog={() => setOpenDialog(false)}>test</Dialog>
      )}
    </>
  );
};

export default Dashboard;
