// importing react
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from ".././images/logo2.png";



function Home() {

  // render the home page
  return (
      <div className="flex-row justify-center">
        <div>
          <h1 className="text-center card-title">A User Friendly Self Helf App</h1>
          <p className="text-center">
            Welcome to Become, our goal is to help you become the best version of yourself. 
            You will increase your awareness, motivation, and feel more inspired to conquer your challenges. 
            Join us and unlock your unlimited potential. 
          </p>
          <img src={logo2} alt="logo" width="100" ></img>
        </div>
      </div>
  );
}

export default Home;

