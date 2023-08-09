// LandingPage.tsx
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import phrases from '../phrases';
import '../css/LandingPage.css'; // Import the custom CSS file
// Import the image using require
const exampleImage = require('../images/output.jpg');
// Define the props interface (if needed)
interface LandingPageProps {
  // Define your props here
}


const LandingPage: FC<LandingPageProps> = () => {
  // Define the function to get a random phrase from the 'phrases' object
  const getRandomPhrase = (): string => { // Provide the correct return type 'string'
    const phraseArray = Object.values(phrases);
    return phraseArray[Math.floor(Math.random() * phraseArray.length)] as string; // Use 'as string' to handle the return type
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get the username and password from the form inputs
    const usernameInput = event.currentTarget.querySelector('#username-input') as HTMLInputElement;
    const passwordInput = event.currentTarget.querySelector('#password-input') as HTMLInputElement;
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Make an HTTP POST request to the backend's login endpoint
    try {
        const response = await fetch('http://localhost:8080/accounts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // Handle successful login (e.g., store user data in localStorage and redirect)
            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = '/village';
        } else {
            // Handle login error (e.g., show an error message)
            const errorData = await response.json();
            console.error('Login error:', errorData);
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('There was a network error. Please try again.');
    }
};

  return (
    <div className="landing-page">
      <div className="container">
    <div className="sidebar">
        <button className="sidebar-button">Home</button>
        <Link to="/create-account">
            <button className="sidebar-button">Create an Account</button>
        </Link>
        <Link to="/rules">
            <button className="sidebar-button">Rules</button>
        </Link>
        <Link to="/leaderboard">
            <button className="sidebar-button">Leaderboard</button>
        </Link>
    </div>
      <div className="center">
        <p className="game-desc">Engage in epic battles, strategize, build your village, and rise to the top!</p>
        <img className="logo" src={exampleImage} alt="Cool Browser Game" />
        <p className="welcome">Welcome to Cool Browser Games! Join now and begin your journey towards greatness.</p>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="username-input">Username:</label>
          <input type="text" id="username-input" required />
          <label htmlFor="password-input" style={{marginLeft: "10px"}}>Password:</label>
          <input type="password" id="password-input" required />
          <button type="submit" className="btn login-btn">Login</button>
        </form>
        <p className="motivational-phrase">"{getRandomPhrase()}"</p>
      </div></div>
    </div>
  
);
};


export default LandingPage;