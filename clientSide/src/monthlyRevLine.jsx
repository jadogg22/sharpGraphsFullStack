import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend, YAxis ,LineChart, Line} from 'recharts'; import './App.css'
import React, { useState, useEffect } from 'react';
import fetchData from './scripts/api';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Customize the tooltip content based on your needs
      const data = payload[0].payload;
      const formattedNumber = new Intl.NumberFormat('en-US').format(data.RevenueAct);
      console.log(data)
      return (
        <div style={{ background: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`Week: ${data.NameStr}`}</p>
          <p style={{color: "green"}}>{`Revenue: $ ${formattedNumber}`}</p> 
        </div>
      );
    }
  
    return null;
  };

const MonthlyRevLine = ( { data}) => {


  return (
    <ResponsiveContainer width="95%" height={400}>
      <div className="text-center">
        <h1 className="text-3xl text-white mb-6">Monthly Revenue (in Thousands)</h1>
      </div>
      <LineChart data={data} margin={{ top: 10, left: 20, right: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3" stroke="#ccc" />
        <XAxis dataKey="Name" stroke="white" />
        <YAxis stroke="white" tickFormatter={(value) => `${value}K`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="Revenue"
          stroke="#34d399"
          strokeWidth={2}
          dot={{ fill: '#34d399', r: 5 }}
          activeDot={{ stroke: 'white', strokeWidth: 2, r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyRevLine;