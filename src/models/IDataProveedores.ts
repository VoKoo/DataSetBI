export type ITypeDataProveedores = IDataProveedores[]


export interface IDataProveedores {
    a_o: string,
    proveedor: string,
    segmento: string,
    tecnolog_a: string,
    tr_fico: string,
    trimestre: string
}

export interface ILineChart {
    dataTraficoAlto: {
        proveedor: string
        tr_fico: number,
        trimestre: string
    }[]

    dataProveedorAno: {
        a_o: string
        proveedor: string
        segmento: string
        tecnolog_a: string
        tr_fico: string
        trimestre: string
    }[]

}