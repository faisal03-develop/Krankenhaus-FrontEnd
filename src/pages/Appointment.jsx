import React from 'react'
import AppointmentForm from '../components/AppointmentForm'

const Appointment = () => {
  return (
    <div className="container page-appointment">
      <h2>Book an Appointment</h2>
      <p>Please fill out the form below and our staff will contact you to confirm.</p>
      <AppointmentForm />
    </div>
  )
}

export default Appointment