import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../Context';

export const Input = styled.input`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  margin-bottom: 4%;
  border: 1px solid #ccc;
  padding: 2%;
  color: #555;
	font: 95% Arial, Helvetica, sans-serif;
	transition: all 0.30s ease-in-out

  &:focus {
    box-shadow: 0 0 5px #2196f3;
    padding: 3%;
    border: 1px solid #2196f3;
  }
`;

export const Button = styled.button`
  position: relative;
  display: block;
  padding: 0;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  background-color: #009879;
  color: #fff;
  transition: background-color 0.3s;
  width: 100px;
  width: 100px;
  height: 45px;
  font-size: 16px;
  float: right;

  &:hover {
    background-color: #009879;
    cursor: pointer;
  }

  &:disabled {
    background-color: #9ccdf5;
    cursor: not-allowed;
  }
`;

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
    <div>
      <Input
        type='text'
        placeholder='Restaurant Name'
        value={restaurantName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRestaurantName(e.target.value)
        }
        // make some onBlur action to show error
      />
      <Input
        type='text'
        placeholder='Location'
        value={restaurantLocation}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRestaurantLocation(e.target.value)
        }
      />
      {/* this will be a select of $ signs */}
      <Input
        type='text'
        placeholder='Price Range'
        value={priceRange}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPriceRange(+e.target.value)
        }
      />
      <Button onClick={handleSubmit}>Add</Button>
    </div>
  );
};

export default RestaurantAdd;
