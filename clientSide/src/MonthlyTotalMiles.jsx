import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend, YAxis ,LineChart, Line} from 'recharts'; import './App.css'
import React, { useState, useEffect } from 'react';
import fetchData from './api';
import Loading from './Loading';


const MonthlyTotalMiles = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData('http://localhost:5000/getMonthlyMiles'); 
        setData(result);
        
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
    console.log(data)

  }, []);

  if(isLoading){
    return<Loading />;
  }
  if(error){
    return<p>Error: {error}</p>;
  }
  

  return(
      <ResponsiveContainer  width="100%" height={400}>
        <h1 className='text-3xl px-30 mx-30 text-white'>Monthy Total Miles (in Thousands)</h1>
      <BarChart data={data} margin={{
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
      }}>
          <CartesianGrid strokeDasharray={"3 3"}></CartesianGrid>
          <XAxis dataKey="Week" stroke="white"></XAxis>
          <YAxis dataKey="TotalTotalMiles" stroke="white"></YAxis>
          <Tooltip></Tooltip>
          <Legend />
          <Bar dataKey="TotalLoadedMiles" stackId="a" fill="#50c878"></Bar>
          <Bar dataKey="TotalEmptyMiles" stackId="a" fill="#EE4B2B"></Bar>
          


      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyTotalMiles;