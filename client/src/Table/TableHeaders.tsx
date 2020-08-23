import React from 'react';
import styled from 'styled-components';
import { Header, IHeader } from '.';

interface IProps {
  headers: Array<IHeader>;
}

const Columns = styled.tr`
  background-color: #009879;
  color: #fff;
  text-align: left;
  font-weight: bold;
`;

const TableHeaders: React.FC<IProps> = ({ headers }) => (
  <thead>
    <Columns>
      {headers.map((header: IHeader) => (
        <Header key={header.key}>{header.displayValue}</Header>
      ))}
      <Header></Header>
    </Columns>
  </thead>
);

export default TableHeaders;
