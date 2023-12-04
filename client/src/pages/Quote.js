
import React, { useState, useEffect } from "react";


const QuotePage = () => {
  const [apiDataList, setApiDataList] = useState([]);

  const api_url = 'https://zenquotes.io/api/quotes/';

  const imageslandscape = ['/images/kalalaubeachkaui.jpg', '/images/mesaarch.jpg', '/images/montrotuiridge.jpg', 
  '/images/mtsuperiorfall.jpg', '/images/priestlakenorthernlights.jpg', '/images/reflectioncanyon.jpg',
  '/images/skypond.jpg', '/images/thewave.jpg'];

  const imagesportrait = [ '/imgages/auroraiceland.jpg', '/images/cedarbreaks.jpg', '/images/deidifoss.jpg', '/images/gufufoss.jpg', 
  '/images/haenbrekkufoss.jpg', '/images/milkywaypriestlake.jpg', '/images/northernlightsicelandcabin.jpg', '/images/skogasfoss.jpg', 
  '/images/teahupoo.jpg']

  const randomlandscapeimage = imageslandscape[Math.floor(Math.random() * imageslandscape.length)];
  const randomportraitimage = imagesportrait[Math.floor(Math.random() * imagesportrait.length)];
  
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

  // i want to use an event listener to change the background image and quote when the user clicks on the quote
  const changeBackground = () => {
    document.body.style.backgroundImage = `url(${randomlandscapeimage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
  }

  const changeBackgroundPortrait = () => {
    document.body.style.backgroundImage = `url(${randomportraitimage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
  }

  const changeQuote = () => {
    const quote = apiDataList[0];
    const author = apiDataList[1];
    document.getElementById("quote").innerHTML = quote;
    document.getElementById("author").innerHTML = author;
  }

  return (
    <div className='notHome'>
      <div className="quote-container">
        <div className="quote">
          <p id="quote">Click me for a quote!</p>
          <p id="author"></p>
        </div>
      </div>
      <button onClick={() => changeBackground() & changeQuote()}>Change Background</button>
      <button onClick={() => changeBackgroundPortrait() & changeQuote()}>Change Background Portrait</button>
    </div>
  );
}

export default QuotePage;

  