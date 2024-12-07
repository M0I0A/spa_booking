import React, { useState, useEffect } from "react";
import './Modify.css';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Modify() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    time: '',
    date: '',
    notes: '',
  });

  const [message, setMessage] = useState(""); // State for success/error messages
  const [error, setError] = useState("");

  useEffect(() => {
    const data = location.state?.phone;
    if (data) {
      const fetchAppointmentData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/appointment/${data}`);
          setFormData({
            name: response.data.name || "",
            service: response.data.service || "",
            time: response.data.time || "",
            date: response.data.date || "",
            notes: response.data.notes || "",
            phone: data,
          });
        } catch (error) {
          console.error("Error fetching appointment data:", error);
          setMessage("Failed to fetch appointment data.");
        }
      };
      fetchAppointmentData();
    }
  }, [location.state?.phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.service || !formData.time || !formData.date || !formData.notes) {
      setError("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/modify-appointment", {
        phone: formData.phone,
        name: formData.name,
        service: formData.service,
        time: formData.time,
        date: formData.date,
        notes: formData.notes,
      });

      setMessage("Appointment updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error updating appointment:", error);
      setMessage("Failed to update the appointment.");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/cancel-appointment", { phone: formData.phone });

      setMessage("Appointment canceled successfully!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error canceling appointment:", error);
      setMessage("Failed to cancel the appointment.");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="form-container">
      <img
        src="https://www.dermaessentia.com/cdn/shop/articles/Hair-Spa-for-Men.jpg?v=1694420768"
        alt="Spa"
        className="form-image"
      />
      <h1>Modify Your Appointment</h1>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleUpdate}>
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
          readOnly
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

        <button className="form-button update-button" type="submit">
          Update
        </button>
      </form>

      <button className="form-button cancel-button" onClick={handleCancel}>
        Cancel Appointment
      </button>

      {message && <div className="status-message">{message}</div>}
    </div>
  );
}

export default Modify;
