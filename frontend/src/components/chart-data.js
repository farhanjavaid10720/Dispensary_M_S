import { faker } from '@faker-js/faker';
import { colors } from './constants/chart-colors';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
export const sales_data = {
  labels: labels,
  datasets: [
    {
      label: 'Sales of 2023',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Sale of 2022',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


export const generate_chart_obj = (labels, data, Placeholder) => {
  return {
    labels: labels,
    datasets: [
      {
        label: Placeholder,
        data: data,
        backgroundColor: colors,
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  }
};
export const chart_options = (title,click_event) => {
  return {

      responsive: true,
      onclick:click_event,
      plugins: {
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: title,
          },
      },
  }
};