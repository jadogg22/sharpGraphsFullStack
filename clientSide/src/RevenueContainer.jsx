import React, { useState, useEffect } from 'react';
import DateRangePicker from './DateRangePicker';
import ComponentThatUsesData from './StackedBar';
import fetchData from './api';
import MonthlyRevLine from './monthlyRevLine';
import {convertTimestampToWeek} from './utilityFunctions'

const RevenueContainer = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle changes in the date range
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };
 
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        if (selectedDateRange && selectedDateRange.start && selectedDateRange.end) {
          setIsLoading(true);

          const start = convertTimestampToWeek(selectedDateRange.start);
          const end = convertTimestampToWeek(selectedDateRange.end);

          console.log('Fetching data for:', start, 'to', end);

          const result = await fetchData(`http://localhost:5000/getRevenue/${start}/${end}`);
          console.log('API response:', result);

          setData(result);
        }
      } catch (error) {
        console.error('API error:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, [selectedDateRange]);

  console.log('Render - data:', data, 'error:', error, 'isLoading:', isLoading);

  return (
    <div>
      <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <MonthlyRevLine data={data} />}
    </div>
  );
};

export default RevenueContainer;