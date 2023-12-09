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

  function getISOWeek(date) {
    const jan4 = new Date(date.getFullYear(), 0, 4);
    const daysSinceJan4 = (date - jan4) / 86400000; // 24 * 60 * 60 * 1000
    return Math.ceil((daysSinceJan4 + jan4.getDay() + 1) / 7) - 1;
    }

  function convertTimestampToWeek(timestamp) {
    const date = new Date(timestamp);
    const isoWeek = getISOWeek(date);
    const year = "2023"
    const weeklyFormat = `${year} W${isoWeek}`;
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

