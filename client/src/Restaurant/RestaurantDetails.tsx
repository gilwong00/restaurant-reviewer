import React from 'react';
import { Stars } from '../Stars';
import { ReviewsList } from '../Reviews';
import { useParams } from 'react-router-dom';
import { useRestaurant } from '../hooks';
import { priceRangeDisplay } from '../utils';
import styled from 'styled-components';
import { Box, CircularProgress, Image, Badge } from '@chakra-ui/core';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const Card = styled.div`
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
//   transition: 0.3s;

//   &:hover {
//     box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
//   }
// `;

// const CardContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 20px;
// `;

const RestaurantDetails: React.FC = () => {
  const { restaurantId }: { restaurantId: string } = useParams();
  const { loading, restaurant } = useRestaurant(restaurantId);

  return (
    <DetailsContainer>
      {loading ? (
        <CircularProgress
          isIndeterminate
          color='teal'
          size='100px'
          thickness={0.1}
        />
      ) : (
        <Box maxW='sm' borderWidth='1px' rounded='lg' overflow='hidden'>
          <Image
            src={restaurant?.photoUrl ?? 'https://bit.ly/2Z4KKcF'}
            alt={restaurant?.name}
          />

          <Box p='6'>
            <Box d='flex' flexDirection='row' justifyContent='space-between'>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated
              >
                {restaurant?.name}
              </Box>

              <Box d='flex' alignItems='center'>
                <Badge rounded='full' px='2' variantColor='teal'>
                  Price Range
                </Badge>
                <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='xs'
                  textTransform='uppercase'
                  ml='2'
                >
                  {priceRangeDisplay(restaurant?.priceRange ?? 0)}
                </Box>
              </Box>
            </Box>

            <Box d='flex' mt='2' alignItems='center'>
              <Stars averageRating={restaurant?.averageRating ?? 0} />
              <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                {restaurant?.reviews.length} reviews
              </Box>
            </Box>
          </Box>
        </Box>
        // render reviews here
        // also add ability to add a review
      )}
      <ReviewsList loading={loading} reviews={restaurant?.reviews ?? []} />
    </DetailsContainer>
  );
};

export default RestaurantDetails;
