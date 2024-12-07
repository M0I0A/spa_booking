import React from "react";
import "../styles/global.css";

const ConfirmationPage = () => {
  return (
    <div className="form-container">
      <img
        src="https://www.dermaessentia.com/cdn/shop/articles/Hair-Spa-for-Men.jpg?v=1694420768"
        alt="Spa"
        className="form-image"
      />
      <h1>Your Appointment is Confirmed!</h1>
      <p className="confirmation-text">
        Thank you for booking your appointment with us. We look forward to
        serving you!
      </p>
      <button
        className="form-button"
        onClick={() => window.location.assign("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ConfirmationPage;
