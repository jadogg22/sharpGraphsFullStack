import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend, YAxis } from 'recharts'; import './App.css'
import { useState, useEffect } from 'react'

function WeeklyCount(){
    const [data, setData] = useState()

    useEffect(()=> {
    const fetchData = async ()  =>{
        const res = await fetch("http://localhost:5000/WeekDayCount");
        const message = await res.json();
        
        setData(message)
        
    }

    fetchData();
    }, []);

    return(
    <ResponsiveContainer  width="100%" height={400}>
      <BarChart data={data} margin={{
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
      }}>
          <CartesianGrid strokeDasharray={"3"}></CartesianGrid>
          <XAxis dataKey="day" stroke="white"></XAxis>
          <YAxis stroke="white"></YAxis>
          <Tooltip></Tooltip>
          <Legend />
          <Bar dataKey="count" fill="#34d399"></Bar>

      </BarChart>
    </ResponsiveContainer>
    )
}

export default WeeklyCount;