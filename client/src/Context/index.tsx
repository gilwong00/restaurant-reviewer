import React, { createContext, useState, useEffect } from 'react';
import { endpoint } from '../constants';

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
  handlePageChange: (direction: Direction) => void;
  sortRestaurants: (sortKey: SortKey, direction: SortDirection) => void;
  addNewRestaurant: (newRestaurant: Partial<IRestaurant>) => void;
}

export const AppContext = createContext<IAppContext>({
  restaurants: [],
  handlePageChange: () => undefined,
  sortRestaurants: () => undefined,
  addNewRestaurant: () => undefined
});

export default ({ children }: { children: React.ReactNode }) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [restaurants, setRestaurants] = useState<Array<IRestaurant>>([]);

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
      const res = await fetch(`${endpoint}/restaurants`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRestaurant)
      });

      const data: IRestaurant = await res.json();
      setRestaurants([...restaurants, data]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${endpoint}/restaurants?offset=${pageNum}`);
        const data: Array<IRestaurant> = await res.json();
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
    addNewRestaurant
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
