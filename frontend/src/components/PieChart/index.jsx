import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function PieChart(props) {
  const data = {
    labels: props.labels,
    datasets: [{
      data: props.value,
      backgroundColor: [
      '#2875FC',
      '#8127F2',
      '#CF0000',
      '#D68315',
      '#00C700',
      '#FFD600',
      '#BA1290',
      '#FF9600',
      '#FF00DB',
      '#081DFF',
      '#0D9E08',
      '#08FFC4'
      ],
      hoverBackgroundColor: [
        '#2875FC',
        '#8127F2',
        '#CF0000',
        '#D68315',
        '#00C700',
        '#FFD600',
        '#BA1290',
        '#FF9600',
        '#FF00DB',
        '#081DFF',
        '#0D9E08',
        '#08FFC4'
      ]
    }]
  };
  return (
    <Pie data={data} />
  );
};
