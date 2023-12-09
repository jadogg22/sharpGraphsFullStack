import React, { useState, useEffect } from 'react';
import fetchData from './api';

const MyComp = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData('');
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  return(
    <div>
        Component is working!
    </div>
  )
};

export default myComp;