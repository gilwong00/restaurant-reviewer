import React, { useState } from 'react';
import { IReview, Review, AddReviewDialog } from '.';
import { AddButton } from '../Button';
import styled from 'styled-components';
import { Heading } from '@chakra-ui/core';

interface IProps {
  reviews: Array<IReview>;
  loading: boolean;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// make this an infinite scroll?
const ReviewsList: React.FC<IProps> = ({ reviews, loading }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <ListContainer>
      {!loading && reviews.length === 0 ? (
        <Heading>No Reviews</Heading>
      ) : (
        reviews.map((review: IReview) => {
          return <Review key={review.id} review={review} />;
        })
      )}

      <AddButton handleClick={() => setOpenDialog(!openDialog)} />
      <AddReviewDialog
        isOpen={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </ListContainer>
  );
};

export default ReviewsList;
