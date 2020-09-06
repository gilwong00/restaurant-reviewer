import React from 'react';
import styled from 'styled-components';

const DialogOverlay = styled.div`
	display: block
	padding-top: 100px;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	z-index: 10000;
	background-color: rgba(0,0,0,0.4);
`;

const DialogContent = styled.div`
  position: relative;
  margin: auto;
  background: #fff;
  padding: 0;
  outline: 0;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  animation: animatetop 0.4s;
  width: 600px;
  height: 500px;
  top: 30%;

  @media (min-width: 993px) {
    width: 800px;
  }
`;

const DialogHeader = styled.div`
  display: block;
  position: relative;
  padding: 0.01em 16px;
  height: 75px;
`;

export const CloseIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 5px;
  font-size: 30px;
  cursor: pointer;
`;

const DialogContainer = styled.div`
  padding: 0.01em 16px;
`;

interface IProps {
  children: React.ReactNode;
  closeDialog: () => void;
}

const Dialog: React.FC<IProps> = ({ children, closeDialog }) => {
  return (
    <DialogOverlay>
      <DialogContent>
        <DialogHeader>
          <CloseIcon onClick={closeDialog}>x</CloseIcon>
          <h2>Add A Restaurant</h2>
        </DialogHeader>
        <DialogContainer>{children}</DialogContainer>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Dialog;
