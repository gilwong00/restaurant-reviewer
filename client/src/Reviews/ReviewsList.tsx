import React, { useState } from 'react';
import { IReview, Review, AddReviewDialog } from '.';
import { AddButton } from '../Button';
import styled from 'styled-components';

interface IProps {
  reviews: Array<IReview>;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// make this an infinite scroll?
const ReviewsList: React.FC<IProps> = ({ reviews }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <ListContainer>
      {reviews.map((review: IReview) => {
        return <Review key={review.id} review={review} />;
      })}
      <AddButton handleClick={() => setOpenDialog(!openDialog)} />
      <AddReviewDialog
        isOpen={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </ListContainer>
  );
};

export default ReviewsList;
