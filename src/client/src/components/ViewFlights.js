import React from 'react';
import EnhancedTable from './EnhancedGrid';
import {useState,useEffect} from 'react';
import axios from 'axios';

export default function ViewFlights() {

    const [flights,setFlights] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/flights/all-flights').then(res => {
        setFlights(res.data);
    })
    
    }, []);

    return (
      <div>



     { flights && <EnhancedTable rows = {flights}></EnhancedTable> }

    {/* // flights.map(f => {return <Button variant="contained">{f.From}</Button>})
    // <Button variant="contained">heyy</Button>
    //  <div> </div>
  // <MyCard myUser={u}/> */}
  </div>

    )
}