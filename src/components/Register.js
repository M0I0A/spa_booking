import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/global.css';

const Register = () => {
  const location = useLocation();  // Access the location object
  const navigate = useNavigate();  // Hook for navigation

  const [formData, setFormData] = useState({
    name: "",
    phone: "",  // Default phone will be updated from location
    service: "",
    time: "",
    date: "",
    notes: "",
  });

  // Set phone from location if it's passed
  useEffect(() => {
    if (location.state?.phone) {
      setFormData(prevState => ({
        ...prevState,
        phone: location.state.phone,  // Set phone from the Home page
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form submission from refreshing the page
    try {
      await axios.post("http://localhost:3000/submit-booking", formData);
      alert("Appointment booked successfully!");
      navigate("/");  // Navigate to the Home page after successful booking
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book the appointment.");
    }
  };

  return (
    <div className="form-container">
      <img
        src="https://www.dermaessentia.com/cdn/shop/articles/Hair-Spa-for-Men.jpg?v=1694420768"  // Replace with your image URL
        alt="Spa"
        className="form-image"  // Add class for styling
      />
      <h1>Register for a Spa Appointment</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="form-field"
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="form-field"
          type="text"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <select
          className="form-field"
          name="service"
          value={formData.service}
          onChange={handleChange}
        >
          <option value="">Select Service</option>
          <option value="Massage">Massage</option>
          <option value="Facial">Facial</option>
          <option value="Manicure">Manicure</option>
        </select>
        <input
          className="form-field"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <input
          className="form-field"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <textarea
          className="form-field"
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <button className="form-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
