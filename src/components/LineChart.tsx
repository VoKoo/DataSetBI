'use client'
import { Line } from "react-chartjs-2"
import { Chart as Chartjs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"
import { ILineChart } from "@/models/IDataProveedores"
import { CHART_COLORS } from "@/helpers/FiltroData"
Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const LineChart: React.FC<ILineChart> = ({ dataTraficoAlto }) => {

    const midata = {
        labels: dataTraficoAlto?.map((el) => el.proveedor),
        datasets: [
            {
                label: `Trafico`,
                data: dataTraficoAlto?.map((el) => el.tr_fico),
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
            },
            // {
            //     label: 'Trafico por año de cada proveedor',
            //     data: dataProveedorAno.map((el) => parseInt(el.tr_fico)),
            //     tension: 0.5,
            //     fill: true,
            //     borderColor: 'rgb(255, 99, 132)',
            //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
            //     pointRadius: 5,
            //     pointBorderColor: 'rgba(255, 99, 132)',
            //     pointBackgroundColor: 'rgba(255, 99, 132)',
            // },
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

    return <Line data={midata} options={misoptions} />
}

export default LineChart;