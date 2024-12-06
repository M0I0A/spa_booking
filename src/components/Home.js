import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css';

const Home = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const checkPhone = async () => {
    if (!phone) {
      alert("Please enter a phone number.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/check-phone/${phone}`);
      if (response.data.exists) {
        // Phone number exists, navigate to Modify page and pass the phone number
        navigate("/modify", { state: { phone } });
      } else {
        // Phone number does not exist, navigate to Register page and pass the phone number
        navigate("/register", { state: { phone } });
      }
    } catch (error) {
      console.error("Error checking phone:", error);
      alert("An error occurred while checking the phone number.");
    }
  };

  return (
    <div className="form-container">
      <img
        src="https://www.dermaessentia.com/cdn/shop/articles/Hair-Spa-for-Men.jpg?v=1694420768"  // Replace with your image URL
        alt="Spa"
        className="form-image"  // Add class for styling
      />
      <h1>Welcome to the Spa Booking System</h1>
      <input
        className="form-field"
        type="text"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="form-button" onClick={checkPhone}>
        Check
      </button>
    </div>
  );
};

export default Home;
