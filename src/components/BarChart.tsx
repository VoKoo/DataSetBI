'use client'
import { Bar } from "react-chartjs-2"
import { Chart as Chartjs, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js"
Chartjs.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler)

const BarChart = () => {

    const beneficios = [0, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const midata = {
        labels: meses,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: 'Beneficios',
                data: beneficios,
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
            }
        ],
    };

    const misoptions = {
        // scales: {
        //     y: {
        //         min: 0
        //     },
        //     x: {
        //         ticks: { color: 'blue' }
        //     }
        // },
        // plugins: {
        //     legend: {
        //         display: false
        //     }
        // }
    };

    return <Bar data={midata} options={misoptions} />
}

export default BarChart