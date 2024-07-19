import React, { useEffect, useState } from 'react'
import AppHorarioClasesLunesViernes from './AppHorarioClasesLunesViernes'
import { useDispatch, useSelector } from 'react-redux'
import { CButton, CCard, CCardBody, CCollapse } from '@coreui/react'
import AppHorarioClasesSabado from './AppHorarioClasesSabado'
import { useNavigate } from 'react-router-dom'

const AppHorarioClases = () => {
  const data = useSelector((state) => state.salonReducer.infoSalonesData)
  const [visibleA, setVisibleA] = useState(false) //horario lunes a viernes
  const [visibleB, setVisibleB] = useState(true) //horario sabado
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      if(data.length===0){
        navigate('/salon')

      }
    }
    fetchData()
  }, []) // Solo se ejecuta cuando 'count' cambia

 
  const abrirHorarioLunesViernes = () => {
    setVisibleA(true)
    setVisibleB(false)
  }
 const abrirHorarioSabado=()=>{
  setVisibleA(false)
  setVisibleB(true)
 }
  return (
   <>
   <h1>
        {' '}
        {data.nombresalon} {' SEDE  '} {data.ubicacion} {'  '}
        {'CAPACIDAD '}
        {data.capacidadsalon}
      </h1>
          <CButton color="primary" onClick={() =>abrirHorarioLunesViernes() }>
              Horario Lunes a viernes
            </CButton>{' '}
            <CButton color="primary" onClick={() => abrirHorarioSabado()}>
              Horario Sabado
            </CButton>
            <div>
              <CCollapse visible={visibleA}>
                <CCard className="mt-3">
                  <CCardBody>
                  <AppHorarioClasesLunesViernes></AppHorarioClasesLunesViernes>

                  </CCardBody>
                </CCard>
              </CCollapse>
              <CCollapse visible={visibleB}>
                <CCard className="mt-3">
                  <CCardBody>
                    <AppHorarioClasesSabado></AppHorarioClasesSabado>
                  </CCardBody>
                </CCard>
              </CCollapse>
            </div>
   </>
  )
}
export default AppHorarioClases
