import React, { useState, useEffect } from 'react';
import fetchData from './api';
import { ResponsiveContainer, Pie, PieChart, Cell, Tooltip } from 'recharts';

const colors = [
  "#ff5722", "#4caf50", "#2196f3", "#e91e63", "#673ab7",
  "#9c27b0", "#03a9f4", "#f44336", "#ff9800", "#8884d8", "#00bcd4",
];



const maxDataKeysToShow = 10;

const RevByCode = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.code === 'Other') {
      // Display revenue for 'Other' category
      const formattedNumber = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.revenue);
      return (
        <div style={{ background: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`Revenue: ${formattedNumber}`}</p>
        </div>
      );
    } else {
      // Display individual code and revenue
      const formattedNumber = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.revenue);
      return (
        <div style={{ background: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`Code: ${data.code}`}</p>
          <p>{`Revenue: ${formattedNumber}`}</p>
        </div>
      );
    }
  }

  return null;
};  

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData('http://192.168.0.228:5000/getRevByCode');
        // Sort data based on revenue in descending order
        const sortedData = result.sort((a, b) => b.revenue - a.revenue);
        // Filter out entries with zero revenue
        const filteredData = sortedData.filter(entry => entry.revenue !== 0);
        // Take only the top N entries
        const truncatedData = filteredData.slice(0, maxDataKeysToShow);
        // Group small entries into a single "Other" category
        const groupedData = [...truncatedData];
        if (filteredData.length > maxDataKeysToShow) {
          const otherData = {
            code: 'Other',
            revenue: filteredData.slice(maxDataKeysToShow).reduce((sum, entry) => sum + entry.revenue, 0),
          };
          groupedData.push(otherData);
        }
        setData(groupedData);
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

    return (
   
      <ResponsiveContainer width="100%" height={600}>
      <div className="text-center pt-5">
        <h1 className="text-3xl text-white mb-6">Monthly Revenue (in Thousands)</h1>
      </div>
      <PieChart >
        <Pie
          data={data}
          dataKey="revenue"
          nameKey="code"
          cx="50%"
          cy="50%"
          outerRadius={225}
          labelLine={false}
          label={(entry) => entry.code} // Display code name in labels
          isAnimationActive={false} // Disable interactivity
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />}/>
      </PieChart>
    </ResponsiveContainer>
  );
};
  

export default RevByCode;