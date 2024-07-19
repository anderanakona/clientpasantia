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
import { Link, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
/* MENU react-contexify */
import 'react-contexify/dist/ReactContexify.css'
import { cilContrast, cilMoon, cilNotes, cilOptions, cilPlus, cilSun } from '@coreui/icons'
import { getHorarioSalon } from '../../api/HorarioClasesService'
import { getAllAsignatura } from '../../api/AsignaturaService'
import { typesSalones } from '../../actions/salonAction'

const AppAsignatura = () => {
  
  const [listAsignaturas, setListAsignaturas] = useState([])
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    async function fetchData() {
      
      const dataListaAsigna = await getAllAsignatura()
      setListAsignaturas(dataListaAsigna.data.body)
    }
    fetchData()
  }, []) // Solo se ejecuta cuando 'count' cambia

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
 

   // Filtrar las asignaturas basadas en el término de búsqueda
   const filteredAsignaturas =  listAsignaturas.filter((asignatura) =>
    asignatura.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asignatura.nombre.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <>
      <div className="mb-3">
        <h4 className="text-center">Asignaturas</h4>
         {/* Campo de búsqueda */}
         <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar asignatura por codigo o nombre"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell scope="col">Codigo asignatura</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nombre asignatura</CTableHeaderCell>
              <CTableHeaderCell scope="col">Descripción</CTableHeaderCell>
              <CTableHeaderCell scope="col">Facultad </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredAsignaturas.map((scheduleItem, index) => (
              <CTableRow key={index}>                
                <CTableDataCell>
                  {scheduleItem.codigo}
                </CTableDataCell>
                <CTableDataCell>{scheduleItem.nombre}</CTableDataCell>
                <CTableDataCell>{scheduleItem.descripcion}</CTableDataCell>
                <CTableDataCell>{scheduleItem.nombrefacultad}</CTableDataCell>                
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default AppAsignatura
