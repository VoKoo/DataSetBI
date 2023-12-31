'use client'
import { ILineChart } from '@/models/IDataProveedores'
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
ChartJs.register(ArcElement, Tooltip, Legend)


const PiesChart: React.FC<ILineChart> = ({ dataTraficoAlto }) => {

    const options = {
        // responsive: true,
        // maintainAspectRatio: false
    }

    const data = {
        labels: dataTraficoAlto.map((el) => el.proveedor),
        datasets: [
            {
                label: 'Popularidad en Navidad',
                data: dataTraficoAlto.map((el) => el.tr_fico),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} options={options} />
}

export default PiesChart
