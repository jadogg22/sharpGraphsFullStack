import React, { useState, useEffect } from 'react';
import fetchData from './api';
import { ResponsiveContainer, Pie, PieChart } from 'recharts';

const data2 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const DestinationsPie = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData('http://localhost:5000/getDestinations');
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
    console.log(data);
  }, []);
    if(isLoading){
        return<p>Loading...</p>;
    }
    if(error){
        return<p>Error: {error}</p>;
    }

  return(
    <ResponsiveContainer width="100%" height={400}>
    <PieChart width={400} height={400}>
    <Pie data={data} dataKey="DestinationCount" nameKey="name" cx="50%" cy="50%" outerRadius={95} fill="#8884d8" label/>

    </PieChart>
  </ResponsiveContainer>
    )
};

export default DestinationsPie;