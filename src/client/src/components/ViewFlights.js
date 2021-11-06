import React from "react";
import EnhancedTable from "./EnhancedGrid";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewFlights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/flights/all-flights").then((res) => {
      setFlights(res.data);
    });
  }, []);

  let navigate = useNavigate();

  function handleClick() {
    navigate("/add-new-flight");
  }

  return (
    <div>
      <button onClick={handleClick}>Add New Flight</button>

      {flights && <EnhancedTable rows={flights}></EnhancedTable>}
    </div>
  );
}
