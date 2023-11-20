'use client'
import BarChart from "@/components/BarChart";
import LineChart from "../components/LineChart";
import PiesChart from "@/components/PiesChart";
import React, { useState, useEffect } from 'react'
import { ITypeDataProveedores } from "@/models/IDataProveedores";
import { filtroPorAño, traficoMasAlto, mejorAñoCadaProveedor, traficoMasAltoPrueba } from "@/helpers/FiltroData";


const Home = () => {

  const [datos, setDatos] = useState<ITypeDataProveedores>([])
  const [filtroTab, setFiltroTab] = useState(1);
  const [periodo, setPeriodo] = useState("2020");
  const [trimestre, setTrimestre] = useState("");
  console.log(filtroTab, "filtroTab", periodo, "periodo", trimestre, "trimestre")

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

  const handleTabClick = (tabNumber: number) => {
    setFiltroTab(tabNumber);
  };

  //Nombres de proveedores
  const nombrePorveedores = datos.map(el => el.proveedor)
  const quitarNombresRepetidos = new Set(nombrePorveedores)
  const newArrayNombresProveedores = [...quitarNombresRepetidos];



  const filtroTraficoMasAlto = traficoMasAlto(datos, periodo)
  const pruebaProveedoresMasAlto = traficoMasAltoPrueba(datos, periodo, trimestre)
  console.log(pruebaProveedoresMasAlto, "pruebaproveedormásalto")
  const mejorAnoProveedor = mejorAñoCadaProveedor(datos)

  const periodo2020 = () => {
    handleTabClick(1)
    setPeriodo("2020")
    setTrimestre("")
  }

  const periodo2021 = () => {
    handleTabClick(2)
    setPeriodo("2021")
    setTrimestre("")

  }

  const periodo2022 = () => {
    handleTabClick(3)
    setPeriodo("2022")
    setTrimestre("")

  }

  const periodo2023 = () => {
    handleTabClick(4)
    setPeriodo("2023")
    setTrimestre("")
  }
  let max = ""
  let maxTrafico = pruebaProveedoresMasAlto.map((e, i) => (
    e.tr_fico
  ))
  let maxTraficoConvert = maxTrafico.reduce((max, valor) => (valor > max ? valor : max), -Infinity)
  console.log(maxTraficoConvert, "este es le valor")

  return (
    <div className="">
      <div className=''>
        <div className='target-explication'>
          <div>
            <h3 className='tittle-target'>{trimestre !== '' ? "Año y trimestre" : "Año por provedor"}</h3>
          </div>
          <div className="content-target">
            <p>En el año {periodo} la empresa {pruebaProveedoresMasAlto.map((e, i) => (
              e.tr_fico === maxTraficoConvert ? e.proveedor : ""
            ))} tiene un tráfico total de: {maxTraficoConvert} siendo el tráfico más alto del {trimestre ? "trimestre" : "año"}
            </p>
          </div>

        </div>
      </div>
      <div className="container-tabla">
        <div className="flex justify-center gap-10">

          <button onClick={periodo2020} className={filtroTab === 1 ? 'active' : ''}>
            2020
          </button>
          <button onClick={periodo2021} className={filtroTab === 2 ? 'active' : ''}>
            2021
          </button>
          <button onClick={periodo2022} className={filtroTab === 3 ? 'active' : ''}>
            2022
          </button>
          <button onClick={periodo2023} className={filtroTab === 4 ? 'active' : ''}>
            2023
          </button>
        </div>
        <div className="flex justify-center gap-10">
          <button onClick={() => setTrimestre("1")}>Trimestre 1</button>
          <button onClick={() => setTrimestre("2")}>Trimestre 2</button>
          <button onClick={() => setTrimestre("3")}>Trimestre 3</button>
          <button onClick={() => setTrimestre("4")}>Trimestre 4</button>
        </div>
        <LineChart dataTraficoAlto={pruebaProveedoresMasAlto} />
      </div>
    </div>
  );
}



export default Home
