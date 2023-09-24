'use client'
import BarChart from "@/components/BarChart";
import LineChart from "../components/LineChart";
import PiesChart from "@/components/PiesChart";
import React, { useState, useEffect } from 'react'
import { ITypeDataProveedores } from "@/models/IDataProveedores";
import { filtroPorAño, traficoMasAlto, mejorAñoCadaProveedor } from "@/helpers/FiltroData";


const Home = () => {

  const [datos, setDatos] = useState<ITypeDataProveedores>([])

  useEffect(() => {
    fetch("https://www.datos.gov.co/resource/4z5v-cr6b.json")
      .then((response) => response.json())
      .then((nuevosDatos) => {
        setDatos(nuevosDatos)
      })
      .catch((err) => {
        console.error('Error en la solicitud Fetch:', err)
      })
  }, [])

  // const filtroAños = filtroPorAño(datos)
  const filtroTraficoMasAlto = traficoMasAlto(datos)
  const mejorAnoProveedor = mejorAñoCadaProveedor(datos)
  console.log(mejorAnoProveedor)

  return (
    <div className="">
      <LineChart dataTraficoAlto={filtroTraficoMasAlto} dataProveedorAno={mejorAnoProveedor} />
      {/* <BarChart /> */}
      {/* <PiesChart /> */}
    </div>
  );
}



export default Home
