
import React, { useState, useEffect } from "react";

import RatingModal from "../components/Modal";

const api_url = 'https://zenquotes.io/api/quotes/';
const data = await fetch(api_url).then((res) => res.json());
const quote = data[0].q;
const author = data[0].a;

const Quotes = () => {
  const [apiDataList, setApiDataList] = useState([]);
  
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const data = await makeApiCall();
        console.log("API Data:", data);
        setApiDataList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedOption) {
      fetchApiData();
    }
  }, [selectedOption]);

  