import React, { useState, useEffect } from 'react';
import fetchData from './api';
import { ResponsiveContainer, Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Customize the tooltip content based on your needs
      const data = payload[0].payload;
      const formattedNumber = new Intl.NumberFormat('en-US').format(data.RevenueActual);
      return (
        <div style={{ background: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`Month: ${data.Month}`}</p>
          <p style={{color: "green"}}>{`Revenue: $ ${formattedNumber}`}</p> 
        </div>
      );
    }
  
    return null;
  };

const YearlyRevenue = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData('http://localhost:5000/getYearlyRevenue');
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
    
  }, []);
  if(isLoading){
    return<p>Loading...</p>;
  }
  if(error){
    return<p>Error: {error}</p>;
  }
  

  return(
      <ResponsiveContainer  width="100%" height={400}>
        <h1 className='text-3xl px-30 mx-30 text-white'>Monthy Revenue (in Thousands)</h1>
      <LineChart data={data} margin={{
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
      }}>
          <CartesianGrid strokeDasharray={"3"}></CartesianGrid>
          <XAxis dataKey="Month" stroke="white"></XAxis>
          <YAxis stroke="white"></YAxis>
          <Tooltip content={<CustomTooltip />}></Tooltip>
          <Legend />
          <Line dataKey="Revenue" fill="#34d399"></Line>

      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearlyRevenue;