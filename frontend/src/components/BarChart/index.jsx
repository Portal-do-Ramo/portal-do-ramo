import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function Barra(props) {
  const data = {
    labels: ['Entrada', 'Saída'],
    datasets: [
      {
        label: 'Valor',
        backgroundColor: '#2B8DFC',
        borderColor: '#2B8DFC',
        borderWidth: 1,
        hoverBackgroundColor: '#1D5EA8',
        hoverBorderColor: '#1D5EA8',
        data: props.value
      }
    ]
  };

  return (
    <div>
      <Bar
        data={data}
        width={20}
        height={200}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  );
}
