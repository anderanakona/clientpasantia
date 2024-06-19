import React, { useEffect, useState } from 'react'
import { getAllSalon, getSalon } from '../../api/SalonService'
import { useDispatch } from 'react-redux'
// Si tienes estilos específicos para este componente
import './ImageContainer.css' // Si tienes estilos específicos para este componente
/* COREUI */
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CTableHeaderCell,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CCollapse,
  CCol,
  CCard,
  CCardBody,
  CRow,
  CTableCaption,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeaderNav,
  CDropdown,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
/* MENU react-contexify */
import 'react-contexify/dist/ReactContexify.css'
import { cilContrast, cilMoon, cilNotes, cilOptions, cilPlus, cilSun } from '@coreui/icons'
import { getHorarioSalon } from '../../api/HorarioClasesService'
import { typesSalones } from '../../actions/salonAction'

const AppSalones = () => {
  const [dataList, setDataList] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      const data = await getAllSalon()
      setDataList(data.data.body)
    }
    fetchData()
  }, []) // Solo se ejecuta cuando 'count' cambia

  const obtenerDetalleSalones = async (codigo) => {
    
    const data = await getSalon(codigo)
    dispatch({
      type: typesSalones.INFO_SALON,
      infoSalonesData: data.data.body[0],
    })
    const dataHorarioSalon = await getHorarioSalon(codigo)

    dispatch({
      type: typesSalones.INFO_SALON,
      horarioSalonData: dataHorarioSalon.data.body,
    })
  }
  return (
    <>
      <div className="mb-3">
        <h4 className="text-center">Aulas</h4>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Codigo aula</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nombre aula</CTableHeaderCell>
              <CTableHeaderCell scope="col">Capacidad</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ubicación </CTableHeaderCell>
              <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Opciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {dataList.map((scheduleItem, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  {scheduleItem.hora_inicio}-{scheduleItem.hora_fin}{' '}
                </CTableDataCell>
                <CTableDataCell>{scheduleItem.codigo_salon}</CTableDataCell>
                <CTableDataCell>{scheduleItem.nombresalon}</CTableDataCell>
                <CTableDataCell>{scheduleItem.capacidadsalon}</CTableDataCell>
                <CTableDataCell>{scheduleItem.ubicacion}</CTableDataCell>
                <CTableDataCell>{scheduleItem.tiposalon}</CTableDataCell>
                <CTableDataCell>
                  <button
                    className="btn btn-primary"
                    title="Agregar Horario"
                    onClick={() => obtenerDetalleSalones(scheduleItem.codigo_salon)}
                  >
                    <CIcon icon={cilPlus} size="lg" />
                  </button>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default AppSalones
