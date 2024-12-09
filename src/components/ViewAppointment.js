import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/global.css";

const ViewAppointment = () => {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone");

  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://spa-booking-backend.onrender.com/appointment/${phone}`);
        if (response.ok) {
          const data = await response.json();
          setAppointmentDetails(data);
        } else {
          console.error("Failed to fetch appointment details");
        }
      } catch (error) {
        console.error("Error fetching appointment details:", error);
      }
    };

    if (phone) fetchDetails();
  }, [phone]);

  return (
    <div className="form-container">
      <img
        src="https://www.dermaessentia.com/cdn/shop/articles/Hair-Spa-for-Men.jpg?v=1694420768"
        alt="Spa"
        className="form-image"
      />
      <h1>Appointment Details</h1>
      {appointmentDetails ? (
        <div className="appointment-details">
          <p><strong>Name:</strong> {appointmentDetails.name}</p>
          <p><strong>Phone:</strong> {appointmentDetails.phone}</p>
          <p><strong>Service:</strong> {appointmentDetails.service}</p>
          <p><strong>Date:</strong> {appointmentDetails.date}</p>
          <p><strong>Time:</strong> {appointmentDetails.time}</p>
          {appointmentDetails.notes && (
            <p><strong>Notes:</strong> {appointmentDetails.notes}</p>
          )}
        </div>
      ) : (
        <p>Loading appointment details...</p>
      )}
      <button className="form-button" onClick={() => window.location.assign("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default ViewAppointment;
