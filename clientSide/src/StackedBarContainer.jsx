import React, { useState, useEffect } from 'react';
import DateRangePicker from './DateRangePicker';
import ComponentThatUsesData from './StackedBar';
import fetchData from './api';

const StackedBarContainer = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle changes in the date range
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };


    function convertTimestampToWeek(timestamp) {
      const date = new Date(timestamp);
      date.setHours(0, 0, 0, 0);
    
      // Find Thursday of the current week
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    
      // Get the first day of the year
      const yearStart = new Date(date.getFullYear(), 0, 1);
    
      // Calculate the week number
      const isoWeek = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
    
      const year = date.getFullYear();
      const weeklyFormat = `${year} W${isoWeek < 10 ? '0' : ''}${isoWeek}`;
    
      return weeklyFormat;
    }

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        if (selectedDateRange && selectedDateRange.start && selectedDateRange.end) {
          setIsLoading(true);

          const start = convertTimestampToWeek(selectedDateRange.start);
          const end = convertTimestampToWeek(selectedDateRange.end);

          console.log('Fetching data for:', start, 'to', end);

          const result = await fetchData(`http://localhost:5000/getData/${start}/${end}`);
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
      {data && <ComponentThatUsesData data={data} />}
    </div>
  );
};

export default StackedBarContainer;

