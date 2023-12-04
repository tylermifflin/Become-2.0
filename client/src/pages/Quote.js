
import React, { useState, useEffect } from "react";

const api_url = 'https://zenquotes.io/api/quotes/';

const Quotes = () => {
  const [apiDataList, setApiDataList] = useState([]);
  
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const data = await makeApiCall();
        const quote = data[0].q;
        const author = data[0].a;
        console.log("API Data:", data);
        setApiDataList(quote, author);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchApiData();
  }
  , []);

  const makeApiCall = async () => {
    const res = await fetch(api_url);
    const data = await res.json();
    return data;
  };

  return (
    <div className="quote">
      <h1>Quote of the Day</h1>
      <h2>{apiDataList[0]}</h2>
      <h3>{apiDataList[1]}</h3>
    </div>
  );

  