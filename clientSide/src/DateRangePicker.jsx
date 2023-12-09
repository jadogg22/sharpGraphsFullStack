import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(new Date('2023-06-01'));
  const [endDate, setEndDate] = useState(new Date('2023-12-01'));

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateRangeChange({ start: date, end: endDate });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateRangeChange({ start: startDate, end: date });
  };

  useEffect(() => {
    // Call onDateRangeChange when startDate or endDate changes
    onDateRangeChange({ start: startDate, end: endDate });
  }, []);

  return (
    <div className="flex items-center space-x-4">
    <div className="relative">
      <label className="block text-sm font-medium text-white">Start Date</label>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Select Start Date"
        className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>

    <div className="relative">
      <label className="block text-sm font-medium text-white">End Date</label>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Select End Date"
        className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  </div>
);
};

export default DateRangePicker;
