import React, { useState } from 'react';
import { Table } from '../Table';
import { AddButton } from '../Button';
import { Dialog } from '../Dialog';
import { RestaurantAdd } from '../Restaurant';

const Dashboard: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <Table />
      <AddButton handleClick={() => setOpenDialog(true)} />
      {openDialog && (
        <Dialog closeDialog={() => setOpenDialog(false)}>
          <RestaurantAdd closeDialog={setOpenDialog} />
        </Dialog>
      )}
    </>
  );
};

export default Dashboard;
