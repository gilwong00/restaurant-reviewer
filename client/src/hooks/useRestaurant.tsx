import { useEffect, useState } from 'react';
import { IRestaurant } from '../Context';
import { endpoint } from '../constants';

const useRestaurant = (restaurantId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [error, setError] = useState<typeof Error | null>(null);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        setLoading(true);

        if (restaurantId) {
          const res = await fetch(`${endpoint}/restaurants/${restaurantId}`);
          const data: IRestaurant = await res.json();

          setRestaurant(data);
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    getRestaurant();
  }, [restaurantId]);

  return { loading, error, restaurant };
};

export default useRestaurant;
