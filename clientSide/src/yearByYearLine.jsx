import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend, YAxis ,LineChart, Line} from 'recharts'; import './App.css'
import React, { useState, useEffect } from 'react';
import fetchData from './api';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Customize the tooltip content based on your needs
      const data = payload.map((entry) => entry.payload);
      console.log(data);
  
      return (
        <div style={{ background: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`Week: ${data[0].Name}`}</p>
          <p className='text-red-400'>{`Revenue 2021: $ ${data[0]["2021 RevenueAct"]}`}</p>
          <p className='text-yellow-600'>{`Revenue 2022: $ ${data[0]["2022 RevenueAct"]}`}</p>
          <p className='text-sky-500'>{`Revenue 2022: $ ${data[0]["2023 RevenueAct"]}`}</p> 
        </div>
      );
    }
  
    return null;
  };


const YearlyRevenue = () => {
    const years = ["2021", "2022", "2023"];
    const colors = ["#ef4444", "#fbbf24", "#0ea5e9"];

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const fetchDataAsync = async () => {
        try {
          setIsLoading(true);
          // Assuming fetchData returns an array of objects with 'year' and 'weeks' properties
          const result = await fetchData('http://localhost:5000/getYearlyRevenue');
          console.log('API response:', result);
          setData(result);
        } catch (error) {
          console.error('API error:', error);
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchDataAsync();
    }, []);
  
    console.log('Render - data:', data, 'error:', error, 'isLoading:', isLoading);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
 // Check if data is not null before processing
 if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <div className="text-center">
        <h1 className="text-3xl text-white mb-6">Weekly Revenue (in Thousands)</h1>
      </div>
      <LineChart data={data} margin={{ top: 10, left: 20, right: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3" stroke="#ccc" />
        <XAxis dataKey="Name" stroke="white" />
        <YAxis stroke="white" tickFormatter={(value) => `${value}K`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />

        {years.map((year, index) => (
          <Line
            key={year}
            type="monotone"
            dataKey={`${year} Revenue`}
            name={`${year} Revenue`}
            stroke={colors[index]}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearlyRevenue;