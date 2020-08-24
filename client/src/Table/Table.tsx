import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { TableHeaders, TableBody, IHeader } from '.';
import { AppContext, SortKey, SortDirection } from '../Context';

const DataTable = styled.table`
  border-collapse: collapse;
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
  min-width: 1200px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

export const Headers: Array<IHeader> = [
  { key: 'name', displayValue: 'Name' },
  { key: 'location', displayValue: 'Location' },
  { key: 'priceRange', displayValue: 'Price Range' },
  { key: 'averageRating', displayValue: 'Rating' }
];

const Table: React.FC = () => {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const { restaurants, sortRestaurants } = useContext(AppContext);

  const handleSort = (column: SortKey) => {
    const newSortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
    setSortDirection(newSortDirection);
    setSortKey(column);
    sortRestaurants(sortKey, newSortDirection);
  };

  return (
    <DataTable>
      <TableHeaders
        headers={Headers}
        handleSort={handleSort}
        sortKey={sortKey}
        direction={sortDirection}
      />
      <TableBody restaurants={restaurants} />
    </DataTable>
  );
};

export default Table;
