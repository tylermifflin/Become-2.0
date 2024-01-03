
import React, { useState, useEffect } from "react";


const QuotePage = () => {
  const [apiData, setApiData] = useState({
    quote: "",
    author: ""
  });
  
  const [loading, setLoading] = useState(true);

  const [backgroundImage, setbackgroundImage] = useState([]);

  const api_url = 'https://zenquotes.io/api/quotes/';

  const imageslandscape = ['/images/kalalaubeachkaui.jpg', '/images/mesaarch.jpg', '/images/montrotuiridge.jpg', 
  '/images/mtsuperiorfall.jpg', '/images/priestlakenorthernlights.jpg', '/images/reflectioncanyon.jpg',
  '/images/skypond.jpg', '/images/thewave.jpg'];

  //const imagesportrait = [ '/imgages/auroraiceland.jpg', '/images/cedarbreaks.jpg', '/images/deidifoss.jpg', '/images/gufufoss.jpg', 
  //'/images/haenbrekkufoss.jpg', '/images/milkywaypriestlake.jpg', '/images/northernlightsicelandcabin.jpg', '/images/skogasfoss.jpg', 
  //'/images/teahupoo.jpg']

  const randomlandscapeimage = imageslandscape[Math.floor(Math.random() * imageslandscape.length)];
  //const randomportraitimage = imagesportrait[Math.floor(Math.random() * imagesportrait.length)];

  const setRandomLandscapeImage = () => {
    setbackgroundImage(randomlandscapeimage);
  };

  const imagestyle = {
    backgroundImage: `url(${randomlandscapeimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-1'
  };
  
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const data = await makeApiCall();
        const quote = data[0].q;
        const author = data[0].a;
        console.log("API Data:", data);
        setApiData({ quote, author });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchApiData();
  }, []);

  const makeApiCall = async () => {
    const res = await fetch(api_url);
    const data = await res.json();
    return data;
  };

  const handleNewQuote = async () => {
    setLoading(true);
    try {
      const data = await makeApiCall();
      const quote = data[0].q;
      const author = data[0].a;
      console.log("API Data:", data);
      setApiData({ quote, author });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleNewBackgroundImage = async () => {
    setRandomLandscapeImage();
  }


  return (
    <div style={imagestyle}>
      <img src={backgroundImage} alt="background" className="bg" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="quote-container">
              <div className="quote-text">
                <i className="fa fa-quote-left"></i><span id="quote">{apiData.quote}</span>
              </div>
              <div className="quote-author">
                <span id="author">{apiData.author}</span>
              </div>
              <div className="buttons">
                <button className="btn btn-primary" id="new-quote" onClick={handleNewQuote}>New Quote</button>
                <button className="btn btn-primary" id="new-background-image" onClick={handleNewBackgroundImage}>New Background Image</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuotePage;

  