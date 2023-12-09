// ComponentThatUsesData.js
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend, YAxis } from 'recharts'; import './App.css'

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    const dataPoint = payload[0];
    return (
      <div className="bg-white border rounded p-2 shadow-md">
        <p className="font-semibold text-lg">{`${label} (${dataPoint.payload.NameStr})`}</p>
        <p className="text-gray-600">{`Total Miles: ${dataPoint.payload.TotalActMiles}`}</p>
        <p className='text-gray-600'>Percent Empty Miles: % <span className='font-semibold text-black'>{`${dataPoint.payload.perEmpty}`}</span></p>
      </div>
    );
  }
  return null;
};


const ComponentThatUsesData = ({ data }) => {
  // Access and use the data received from the parent component
  return (
    <ResponsiveContainer  width="100%" height={400}>
        <h1 className='text-3xl px-30 mx-30 text-white'>Monthy Total Miles (in Thousands)</h1>
      <BarChart data={data} margin={{
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
      }}>
          <CartesianGrid strokeDasharray={"3 3"}></CartesianGrid>
          <XAxis dataKey="Name" stroke="white"></XAxis>
          <YAxis dataKey="TotalTotalMiles" stroke="white"></YAxis>
          <Tooltip content={<CustomTooltip />}></Tooltip>
          <Legend />
          <Bar dataKey="TotalLoadedMiles" stackId="a" fill="#50c878"></Bar>
          <Bar dataKey="TotalEmptyMiles" stackId="a" fill="#EE4B2B"></Bar>
          


      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComponentThatUsesData;
