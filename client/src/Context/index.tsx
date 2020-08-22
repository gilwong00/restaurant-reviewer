import React, { createContext, useState, useEffect } from "react";

export type Direction = "previous" | "next";

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
}

export const AppContext = createContext<IAppContext>({
  restaurants: [],
  handlePageChange: () => undefined,
});

export default ({ children }: { children: React.ReactNode }) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [restaurants, setRestaurants] = useState<Array<IRestaurant>>([]);

  const handlePageChange = (direction: Direction) => {
    return direction === "previous"
      ? setPageNum(pageNum - 1)
      : setPageNum(pageNum + 1);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(
          `https://q8eb91ma0b.execute-api.us-east-2.amazonaws.com/dev/restaurants?offset=${pageNum}`
        );
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
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
