import styled from 'styled-components';

export const Header = styled.th`
	padding: 12px; 15px;
	cursor: pointer;
`;

export const TableData = styled.td`
	padding: 12px; 15px;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export interface IHeader {
  key: string;
  displayValue: string;
}

export { default as Table } from './Table';
export { default as TableHeaders } from './TableHeaders';
export { default as TableBody } from './TableBody';
