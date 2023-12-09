import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend, YAxis } from 'recharts'; import './App.css'
import { useState, useEffect } from 'react'



function TrippleBarChart(){

    const [data, setData] = useState()

    useEffect(()=> {
    const fetchData = async ()  =>{
        const res = await fetch("http://localhost:5000/data");
        const message = await res.json();

        const orderedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
        console.log(message)

        const reorderedData = {};
        orderedDays.forEach(day => {
        reorderedData[day] = message[day];
        });
        const days = Object.keys(reorderedData);

        setData(reorderedData)
        console.log(reorderedData)
    }

    fetchData();
    }, []);

    return (
    <ResponsiveContainer  width="100%" height={400}>
      <BarChart data={data} margin={{
        top: 10,
        left: 30,
        right: 20,
        bottom: 10
      }}>
          <CartesianGrid strokeDasharray={"3"}></CartesianGrid>
          <XAxis dataKey={(index) => days[index]}></XAxis>
          <YAxis></YAxis>
          <Tooltip></Tooltip>
          <Legend />
          <Bar dataKey="Total Bill Miles" fill="#ca888a"></Bar>
          <Bar dataKey="Total Emtpy Miles" fill="#ca888a"></Bar>
          <Bar dataKey="Total Loaded Miles" fill="#ca888a"></Bar>

      </BarChart>
    </ResponsiveContainer>
    )
}
export default TrippleBarChart;