import { useEffect, useState } from 'react';
import { IRestaurant } from '../Context';
import { endpoint } from '../constants';
import axios from 'axios';

const useRestaurant = (restaurantId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [error, setError] = useState<typeof Error | null>(null);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        setLoading(true);

        if (restaurantId) {
          const { data } = await axios.get<IRestaurant>(
            `${endpoint}/restaurants/${restaurantId}`
          );

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
