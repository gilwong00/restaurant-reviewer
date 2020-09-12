import React, { useState, useContext } from 'react';
import { AppContext } from '../Context';
import { Stack, Input, Button } from "@chakra-ui/core";

interface IProps {
  closeDialog: (open: boolean) => void;
}

const RestaurantAdd: React.FC<IProps> = ({ closeDialog }) => {
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [restaurantLocation, setRestaurantLocation] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(0);
  const { addNewRestaurant } = useContext(AppContext);

  const handleSubmit = async () => {
    await addNewRestaurant({
      name: restaurantName,
      location: restaurantLocation,
      priceRange
    });
    closeDialog(false);
  };

  return (
    <Stack spacing={3}>
      <Input
      size="md"
        type='text'
        placeholder='Restaurant Name'
        value={restaurantName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRestaurantName(e.target.value)
        }
        // make some onBlur action to show error
      />
      <Input
        size="md"
        type='text'
        placeholder='Location'
        value={restaurantLocation}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRestaurantLocation(e.target.value)
        }
      />
      {/* this will be a select of $ signs */}
      <Input
      size="md"
        type='text'
        placeholder='Price Range'
        value={priceRange}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPriceRange(+e.target.value)
        }
      />
      <Button variantColor="teal" variant="solid" onClick={handleSubmit}>Add</Button>
    </Stack>


  );
};

export default RestaurantAdd;
