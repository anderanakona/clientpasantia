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
import CIcon from '@coreui/icons-react'
/* MENU react-contexify */
import { getAllProfesor } from '../../api/ProfesorService' 

const AppProfesor = () => {
  const [listProfesores, setListProfesores] = useState([])


  useEffect(() => {
    async function fetchData() {
      
      const dataLista = await getAllProfesor()
      setListProfesores(dataLista.data.body)
    }
    fetchData()
  }, []) // Solo se ejecuta cuando 'count' cambia

  return (
    <>
      <div className="mb-3">
        <h4 className="text-center">Asignaturas</h4>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell scope="col">Nombres y apellidos completos </CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Telefono </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {listProfesores.map((scheduleItem, index) => (
              <CTableRow key={index}>   
                <CTableDataCell>{scheduleItem.nombre}</CTableDataCell>
                <CTableDataCell>{scheduleItem.email}</CTableDataCell>
                <CTableDataCell>{scheduleItem.telefono}</CTableDataCell>                
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default AppProfesor
