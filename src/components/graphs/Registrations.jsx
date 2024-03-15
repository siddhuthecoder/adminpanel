import React from 'react';
import { Line } from 'react-chartjs-2';

const RegistrationGraph = () => {
  const registrationsData = {
    labels: ['2022-01-01', '2022-01-02', '2022-01-03'], // Dates
    datasets: [
      {
        label: 'Registrations per Day',
        data: [10, 20, 15], // Number of registrations per day
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Registrations per Day</h2>
      <Line data={registrationsData} />
    </div>
  );
};

export default RegistrationGraph;
