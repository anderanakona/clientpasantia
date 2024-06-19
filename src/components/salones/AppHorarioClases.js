import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { typesModal } from '../../actions/modalesAction'
import { typesSalones } from '../../actions/salonAction'
import { getSalon } from '../../api/SalonService'
import { getHorarioSalon } from '../../api/HorarioClasesService'
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
} from '@coreui/react'

const AppHorarioClases = () => {
  const dispatch = useDispatch()
}
export default AppHorarioClases
