import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Input,
  Textarea,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Progress
} from '@chakra-ui/core';
import { AppContext } from '../Context';

interface IProps {
  isOpen: boolean;
  closeDialog: () => void;
}

const AddReviewDialog: React.FC<IProps> = ({ isOpen, closeDialog }) => {
  const [name, setName] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { restaurantId }: { restaurantId: string } = useParams();
  const { addReview, percentage } = useContext(AppContext);

  const handleRatingChange = (direction: 'increment' | 'decrement') => {
    let currentRating = rating;
    currentRating = typeof rating === 'string' ? 0 : rating;

    if (direction === 'increment') {
      setRating(rating === 5 ? currentRating : (currentRating += 1));
    } else {
      setRating(rating === 1 ? currentRating : (currentRating -= 1));
    }
  };

  return (
    <Modal isOpen={isOpen} isCentered onClose={closeDialog}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Review</ModalHeader>
        <ModalCloseButton onClick={closeDialog} />
        <ModalBody>
          <Stack spacing={3}>
            <Input
              size='md'
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <Textarea
              size='sm'
              placeholder='Tell us what you think?'
              value={review}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReview(e.target.value)
              }
            />
            <NumberInput
              min={1}
              max={5}
              keepWithinRange={true}
              clampValueOnBlur={false}
            >
              <NumberInputField
                type='number'
                placeholder='How would you rate us?'
                value={rating}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRating(+e.target.value)
                }
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() => {
                    handleRatingChange('increment');
                  }}
                />
                <NumberDecrementStepper
                  onClick={() => {
                    handleRatingChange('decrement');
                  }}
                />
              </NumberInputStepper>
            </NumberInput>
            <Button
              isLoading={isLoading}
              variantColor='teal'
              variant='solid'
              onClick={async () => {
                if (name && review && rating) {
                  setIsLoading(true);
                  await addReview(restaurantId, {
                    name,
                    review,
                    rating: +rating
                  });

                  setIsLoading(false);
                  closeDialog();
                }
              }}
            >
              Add
            </Button>

            {isLoading && percentage && (
              <Progress color='teal' hasStripe={true} value={percentage} />
            )}
          </Stack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddReviewDialog;
