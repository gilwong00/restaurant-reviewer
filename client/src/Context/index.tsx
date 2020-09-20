import React, { createContext, useState, useEffect } from 'react';
import { endpoint } from '../constants';
import axios from 'axios';
import { IReview } from '../Reviews';

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
        `${endpoint}/restaurants`,
        newRestaurant
      );

      setRestaurants([...restaurants, data]);
    } catch (err) {
      console.error(err);
    }
  };

  const addReview = async (restaurantId: string, newReview: IReview) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
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

    const { data } = await axios.post(
      `${endpoint}/restaurants/review/${restaurantId}`,
      newReview,
      options
    );

    console.log('data', data);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get<Array<IRestaurant>>(
          `${endpoint}/restaurants?offset=${pageNum}`
        );
        setRestaurants(data);
      } catch (err) {
        throw err;
      }
    };
    fetchRestaurants();
  }, [pageNum]);

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
