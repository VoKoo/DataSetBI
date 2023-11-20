'use client'
import LineChart from "../components/LineChart";
import React, { useState, useEffect, use } from 'react'
import { ITypeDataProveedores } from "@/models/IDataProveedores";
import { traficoMasAltoPrueba } from "@/helpers/FiltroData";


const Home = () => {

  const [datos, setDatos] = useState<ITypeDataProveedores>([])
  const [filtroTab, setFiltroTab] = useState(1);
  const [periodo, setPeriodo] = useState("2020");
  const [trimestre, setTrimestre] = useState("");
  const [isActive, setIsActive] = useState({
    trimestreUno: false,
    trimestreDos: false,
    trimestres: false,
    trimestreCuatro: false
  })

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
  // const nombrePorveedores = datos.map(el => el.proveedor)
  // const quitarNombresRepetidos = new Set(nombrePorveedores)
  // const newArrayNombresProveedores = [...quitarNombresRepetidos];

  const pruebaProveedoresMasAlto = traficoMasAltoPrueba(datos, periodo, trimestre)
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

  const maxTrafico = pruebaProveedoresMasAlto.map(e => e.tr_fico)
  let maxTraficoConvert = maxTrafico.reduce((max, valor) => (valor > max ? valor : max), -Infinity)

  return (
    <div className="">

      <div className=''>
        <div className='target-explication flex items-center contenedor bg-slate-700'>
          <div>
            <h3 className='tittle-target text-lg font-bold'>{trimestre !== '' ? "Año y trimestre" : "Año por provedor"}</h3>
          </div>
          <div className="content-target text-base font-normal">
            {pruebaProveedoresMasAlto.length !== 0 ?
              <p>En el año {periodo} la empresa {pruebaProveedoresMasAlto.map((e, i) => (
                e.tr_fico === maxTraficoConvert ? e.proveedor : ""
              ))} tiene un tráfico total de: {maxTraficoConvert} siendo el tráfico más alto del {trimestre ? `trimestre ${trimestre}` : "año"}
              </p>
              :
              <div>No hay información</div>
            }
          </div>
        </div>
      </div>
      <div className="container-tabla">
        <div className="flex justify-center gap-10 font-bold mt-2 text-lg">
          <button onClick={periodo2020} className={filtroTab === 1 ? 'bg-slate-700 p-1 rounded-md' : ''}>
            2020
          </button>
          <button onClick={periodo2021} className={filtroTab === 2 ? 'bg-slate-700 p-1 rounded-md' : ''}>
            2021
          </button>
          <button onClick={periodo2022} className={filtroTab === 3 ? 'bg-slate-700 p-1 rounded-md' : ''}>
            2022
          </button>
          <button onClick={periodo2023} className={filtroTab === 4 ? 'bg-slate-700 p-1 rounded-md' : ''}>
            2023
          </button>
        </div>
        <div className="flex justify-center gap-10 font-bold text-lg mt-4">
          <button className={trimestre === "1" ? "bg-slate-700 p-1 rounded-md" : ""} onClick={() => setTrimestre("1")}>Trimestre 1</button>
          <button className={trimestre === "2" ? "bg-slate-700 p-1 rounded-md" : ""} onClick={() => setTrimestre("2")}>Trimestre 2</button>
          <button className={trimestre === "3" ? "bg-slate-700 p-1 rounded-md" : ""} onClick={() => setTrimestre("3")}>Trimestre 3</button>
          <button className={trimestre === "4" ? "bg-slate-700 p-1 rounded-md" : ""} onClick={() => setTrimestre("4")}>Trimestre 4</button>
        </div>
        <div className="mt-4">
          {pruebaProveedoresMasAlto.length === 0 ?
            ""
            :
            <div className="contenedor">
              <LineChart dataTraficoAlto={pruebaProveedoresMasAlto} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}



export default Home
