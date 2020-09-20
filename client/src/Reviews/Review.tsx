import React from 'react';
import { IReview } from '.';
import { Box, Divider } from '@chakra-ui/core';
import { Stars } from '../Stars';
import styled from 'styled-components';

interface IProps {
  review: IReview;
}

const ReviewContainer = styled(Box)`
  width: 380px;
  margin-top: 10px;
`;

const Review: React.FC<IProps> = ({ review }) => {
  return (
    <ReviewContainer maxW='md' borderWidth='1px' rounded='lg' overflow='hidden'>
      <Box p='6'>
        <Box d='flex' flexDirection='column'>
          <Box d='flex' flexDirection='row' justifyContent='space-between'>
            <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              isTruncated
            >
              {review?.name}
            </Box>
            <Box mt='1' isTruncated>
              <Stars averageRating={review.rating ?? 0} />
            </Box>
          </Box>

          <Divider />
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
            {review.review}
          </Box>
        </Box>
      </Box>
    </ReviewContainer>
  );
};

export default Review;
