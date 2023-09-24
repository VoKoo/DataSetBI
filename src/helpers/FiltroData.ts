import { ITypeDataProveedores } from "@/models/IDataProveedores";


export const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

export const filtroPorAño = (jsonData: ITypeDataProveedores) => {
    // Crear un objeto para almacenar los años por proveedor
    const yearsByProvider: Record<string, string[]> = {};

    // Iterar a través de los datos y agrupar los años por proveedor
    jsonData.forEach(item => {
        const proveedor = item.proveedor;
        const año = item.a_o;

        if (!yearsByProvider[proveedor]) {
            yearsByProvider[proveedor] = []
        }

        if (!yearsByProvider[proveedor].includes(año)) {
            yearsByProvider[proveedor].push(año)
        }
    });

    for (const proveedor in yearsByProvider) {
        yearsByProvider[proveedor].sort();
    }

    const result = Object.keys(yearsByProvider).map(proveedor => ({
        proveedor,
        años: yearsByProvider[proveedor]
    }))

    result.sort((a, b) => a.proveedor.localeCompare(b.proveedor))

    return result
}

export const traficoMasAlto = (jsonData: ITypeDataProveedores) => {

    const highestTrafficByProviderAndQuarter: Record<string, Record<string, number>> = {};
    const data2021 = jsonData.filter(item => item.a_o === "2021");

    // Iterar a través de los datos y calcular el tráfico más alto por proveedor y trimestre
    data2021.forEach(item => {
        const proveedor = item.proveedor;
        const trimestre = item.trimestre;
        const tr_fico = parseFloat(item.tr_fico); // Convertir el tráfico a número

        if (!highestTrafficByProviderAndQuarter[proveedor]) {
            highestTrafficByProviderAndQuarter[proveedor] = {};
        }

        if (!highestTrafficByProviderAndQuarter[proveedor][trimestre] || tr_fico > highestTrafficByProviderAndQuarter[proveedor][trimestre]) {
            highestTrafficByProviderAndQuarter[proveedor][trimestre] = tr_fico;
        }
    });

    // Crear un array de objetos con el tráfico más alto por proveedor y trimestre
    const result: { proveedor: string; trimestre: string; tr_fico: number }[] = [];
    for (const proveedor in highestTrafficByProviderAndQuarter) {
        for (const trimestre in highestTrafficByProviderAndQuarter[proveedor]) {
            const tr_fico = highestTrafficByProviderAndQuarter[proveedor][trimestre];
            result.push({ proveedor, trimestre, tr_fico });
        }
    }

    const proveedorPorTrimestre = result.filter(el => el.trimestre === "1")

    return proveedorPorTrimestre
}

export const mejorAñoCadaProveedor = (jsonData: ITypeDataProveedores) => {
    // Crear un objeto para almacenar el tráfico más alto por proveedor y año
    const maxTrafficByProviderAndYear: Record<string, Record<string, number>> = {};

    // Iterar a través de los datos y encontrar el tráfico más alto por proveedor y año
    jsonData.forEach(item => {
        const proveedor = item.proveedor;
        const year = item.a_o;
        const trafico = parseInt(item.tr_fico, 10);

        if (!maxTrafficByProviderAndYear[proveedor]) {
            maxTrafficByProviderAndYear[proveedor] = {};
        }

        if (!maxTrafficByProviderAndYear[proveedor][year]) {
            maxTrafficByProviderAndYear[proveedor][year] = 0;
        }

        if (trafico > maxTrafficByProviderAndYear[proveedor][year]) {
            maxTrafficByProviderAndYear[proveedor][year] = trafico;
        }
    });

    // Crear un array para almacenar la información del tráfico más alto por año
    const maxTrafficInfoByYear: Record<string, any> = {};

    // Encontrar la información del tráfico más alto por año
    for (const proveedor in maxTrafficByProviderAndYear) {
        const years = maxTrafficByProviderAndYear[proveedor];

        for (const year in years) {
            const maxTraffic = years[year];
            const matchingItem = jsonData.find(item => item.proveedor === proveedor && item.a_o === year && parseInt(item.tr_fico, 10) === maxTraffic);
            console.log(matchingItem)
            if (matchingItem) {
                maxTrafficInfoByYear[year] = matchingItem;
            }
        }
    }

    // Convertir el objeto de resultados en un array
    const maxTrafficInfoArray = Object.values(maxTrafficInfoByYear);

    return maxTrafficInfoArray;
}