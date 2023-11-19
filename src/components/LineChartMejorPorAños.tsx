'use client'
import { Line } from "react-chartjs-2"
import { Chart as Chartjs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"
import { ILineChartProveedorAno } from "@/models/IDataProveedores"
import { CHART_COLORS } from "@/helpers/FiltroData"
Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const LineChartMejorPorAños: React.FC<ILineChartProveedorAno> = ({ dataProveedorAno }) => {

    // console.log(dataProveedorAno)

    const midata = {
        labels: dataProveedorAno.map((el) => el.proveedor),
        datasets: [
            {
                label: 'Trafico por año de cada proveedor',
                data: dataProveedorAno.map((el) => parseInt(el.tr_fico)),
                tension: 0.5,
                fill: true,
                borderColor: CHART_COLORS.blue,
                backgroundColor: CHART_COLORS.bluebg,
                pointRadius: 5,
                pointBorderColor: CHART_COLORS.blue,
                pointBackgroundColor: CHART_COLORS.blue,
            },
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

export default LineChartMejorPorAños