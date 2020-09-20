import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { IReview } from '../Reviews';
import { useToast } from '@chakra-ui/core';

export type Direction = 'previous' | 'next';
export type SortKey = 'name' | 'location' | 'priceRange' | 'averageRating';
export type SortDirection = 'asc' | 'desc';

export interface IRestaurant {
  id: string;
  name: string;
  location: string;
  priceRange: number;
  dateAdded: string;
  photoUrl?: string;
  reviews: Array<any>;
  averageRating: number;
}

interface IToastMessage {
  title: string;
  description: string;
  status: 'success' | 'error';
}

interface IAppContext {
  restaurants: Array<IRestaurant>;
  percentage: number;
  handlePageChange: (direction: Direction) => void;
  sortRestaurants: (sortKey: SortKey, direction: SortDirection) => void;
  addNewRestaurant: (newRestaurant: Partial<IRestaurant>) => void;
  addReview: (restaurantId: string, newReview: IReview) => void;
}

export const AppContext = createContext<IAppContext>({
  restaurants: [],
  percentage: 0,
  handlePageChange: () => undefined,
  sortRestaurants: () => undefined,
  addNewRestaurant: () => undefined,
  addReview: () => undefined
});

export default ({ children }: { children: React.ReactNode }) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [restaurants, setRestaurants] = useState<Array<IRestaurant>>([]);
  const [percentage, setPercentage] = useState<number>(0);
  const [notification, setNotification] = useState<IToastMessage | null>();
  const toast = useToast();

  const handlePageChange = (direction: Direction) => {
    return direction === 'previous'
      ? setPageNum(pageNum - 1)
      : setPageNum(pageNum + 1);
  };

  const sortRestaurants = (sortKey: SortKey, direction: SortDirection) => {
    const currentRestaurants = restaurants.slice();
    const sorted = currentRestaurants.sort((a, b) => {
      if (direction === 'asc') {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] > b[sortKey] ? -1 : 1;
      }
    });

    setRestaurants(sorted);
  };

  const addNewRestaurant = async (newRestaurant: Partial<IRestaurant>) => {
    try {
      const { data } = await axios.post<IRestaurant>(
        `/api/restaurants`,
        newRestaurant
      );

      setRestaurants([...restaurants, data]);
      setNotification({
        title: 'Success',
        description: 'Restaurant Added Successfully',
        status: 'success'
      });
    } catch (err) {
      setNotification({
        title: 'Error',
        description: err.message,
        status: 'error'
      });
    }
  };

  const addReview = async (restaurantId: string, newReview: IReview) => {
    const options = {
      onUploadProgress: ({
        loaded,
        total
      }: {
        loaded: number;
        total: number;
      }) => {
        const percentCompleted = Math.round((loaded * 100) / total);
        setPercentage(percentCompleted);
      }
    };

    try {
      const { data } = await axios.post<IRestaurant>(
        `/api/reviews/${restaurantId}`,
        newReview,
        options
      );

      const currentRestaurants = restaurants.slice();
      const indexToUpdate = currentRestaurants.findIndex(
        restaurant => restaurant.id === data.id
      );

      currentRestaurants[indexToUpdate] = data;
      setRestaurants(currentRestaurants);

      setNotification({
        title: 'Success',
        description: 'Review Added Successfully',
        status: 'success'
      });
    } catch (err) {
      setNotification({
        title: 'Error',
        description: err.message,
        status: 'error'
      });
    }
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get<Array<IRestaurant>>(
          `/api/restaurants?offset=${pageNum}`
        );

        setRestaurants(data);
        setNotification({
          title: 'Success',
          description: 'Fetched Restaurants',
          status: 'success'
        });
      } catch (err) {
        setNotification({
          title: 'Error',
          description: err.message,
          status: 'error'
        });
      }
    };
    fetchRestaurants();
  }, [pageNum, setNotification]);

  useEffect(() => {
    if (notification) {
      toast({
        ...notification,
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    }
  }, [notification, toast]);

  const context: IAppContext = {
    restaurants,
    handlePageChange,
    sortRestaurants,
    addNewRestaurant,
    addReview,
    percentage
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
