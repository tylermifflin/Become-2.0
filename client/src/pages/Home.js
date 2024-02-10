// importing react
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from ".././images/logo.png";



function Home() {

  // render the home page
  return (
      <div className="flex-row justify-center">
        <div className="container-fluid">
          <h1 className="text-center card-title">A User Friendly Self Helf App</h1>
          <p className="text-center">
            Welcome to Become, our goal is to help you become the best version of yourself. 
            You will increase your awareness, motivation, and feel more inspired to conquer your challenges. 
            Join us and unlock your unlimited potential. 
          </p>
          <div className="card">
          <img src={logo} alt="logo" width="100" className="card-img" ></img>
          </div>
        </div>
      </div>
  );
}

export default Home;

