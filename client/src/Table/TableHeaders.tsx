import React from 'react';
import styled from 'styled-components';
import { Header, IHeader } from '.';
import { SortKey, SortDirection } from '../Context';

interface IProps {
  headers: Array<IHeader>;
  handleSort: (sortKey: SortKey) => void;
  sortKey: SortKey;
  direction: SortDirection;
}

const Columns = styled.tr`
  background-color: #009879;
  color: #fff;
  text-align: left;
  font-weight: bold;
`;

const TableHeaders: React.FC<IProps> = ({
  headers,
  handleSort,
  sortKey,
  direction
}) => (
  <thead>
    <Columns>
      {headers.map((header: IHeader) => (
        <Header key={header.key} onClick={() => handleSort(header.key)}>
          {header.displayValue}{' '}
          {sortKey === header.key && (
            <i
              className={`fas fa-caret-${direction === 'asc' ? 'down' : 'up'}`}
            ></i>
          )}
        </Header>
      ))}
      <Header></Header>
    </Columns>
  </thead>
);

export default TableHeaders;
