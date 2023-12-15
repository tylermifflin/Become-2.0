// importing react
import React, { useEffect } from "react";
// importing logo1 from the images folder
//import { gsap } from "gsap";


function Home() {

  // animation for home page from green sock
  //useEffect(() => {
    //gsap.to(".box", {
      //y: -100,
      //delay: 1,
      //duration: 2,
      //opacity: 1,
      //fill: "#000000",
      //immediateRender: false,
   // });
 // }, []);

  // render the home page
  return (
    <main className="home">
      {" "}
      <div className="flex-row justify-center box">
        {" "}
        <div className="landingPageText">
          <h1 className="text-center card-title">A User Friendly Self Helf App</h1>{" "}
          <p className="text-center">
            Welcome to Become, our goal is to help you become the best version of yourself. 
            You will increase your awareness, motivation, and feel more inspired to conquer your challenges. 
            Join us and unlock your unlimited potential.{" "}  
          </p>{" "}
        </div>{" "}
      </div>
    </main>
  );
}

export default Home;

