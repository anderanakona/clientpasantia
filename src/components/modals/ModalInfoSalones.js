import React, { useEffect, useState } from 'react'

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

/* REACTJS-REDUX */
import { useDispatch, useSelector } from 'react-redux'
import { typesModal } from '../../actions/modalesAction'

/**
 * @name ModalDetallePrerrequisitosCaso
 * @description Modal con la información detallada que contiene un caso de migración
 * @property {Boolean} modalInfoSalonesShow Activa la visualización del componente
 * @property {function} dispatch lanza acción al reducer modalReducer
 * @property {object} data Información del caso de migración
 * @returns Componente Funcional
 */
export const ModalInfoSalones = () => {
  const modalInfoSalonesShow = useSelector((state) => state.modalReducer.modalInfoSalonesShow)
  const dataHorario = useSelector((state) => state.salonReducer.horarioSalonData)
  const dataHorarioSabado = useSelector((state) => state.salonReducer.horarioSalonDataSabado)
  const data = useSelector((state) => state.salonReducer.infoSalonesData)
  const [visibleA, setVisibleA] = useState(false) //descripción
  const [visibleB, setVisibleB] = useState(true) //horarios
  const [scheduleData, setScheduleData] = useState([])

  const abrirDescripcion = () => {
    setVisibleA(true)
    setVisibleB(false)
  }
  const abrirHorarios = () => {
    setVisibleA(false)
    setVisibleB(true)
  }

  const quitarSegundos=(horaConSegundos)=> {    // Separar la hora y minutos
    var horaMinutos = horaConSegundos.split(':').slice(0, 2).join(':');    
    return horaMinutos;
  }
  const formatearHora=(horaConSegundos)=> {

    // Separar la hora y minutos
    var horaMinutos = quitarSegundos(horaConSegundos.split(':').slice(0, 2).join(':'));
  
    // Crear un objeto Date para obtener el formato AM/PM
    var date = new Date();
    date.setHours(parseInt(horaMinutos.split(':')[0], 10));
    date.setMinutes(parseInt(horaMinutos.split(':')[1], 10));
  
    // Obtener la hora en formato AM/PM
    var horaAMPM = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  
    return horaAMPM;
  }

  const dispatch = useDispatch()
  return (
    <>
      {data && (
        <CModal
          scrollable
          visible={modalInfoSalonesShow}
          size="lg"
          onClose={() =>
            dispatch({
              type: typesModal.MODAL_INFO_SALONES,
              modalInfoSalonesShow: false,
            })
          }
        >
          <CModalHeader>
            <CModalTitle>
              {' '}
              {data.nombresalon} {' SEDE  '} {data.ubicacion} {'  '}
              {'CAPACIDAD '}
              {data.capacidadsalon}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            
            <CButton color="primary" onClick={() => abrirHorarios()}>
              Horario Lunes a viernes
            </CButton>{' '}
            <CButton color="primary" onClick={() => abrirDescripcion()}>
              Horario Sabado
            </CButton>
            <br></br>
            <div>
              <CCollapse visible={visibleA}>
                <CCard className="mt-3">
                  <CCardBody>
                  <CTable align="middle" className="mb-0 border"  bordered borderColor="primary" hover responsive>
                      <CTableHead color="light">
                        <CTableRow>
                          <CTableHeaderCell scope="col">Hora</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Sabado</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {dataHorarioSabado.map((scheduleItem, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell>
                              {formatearHora(scheduleItem.hora_inicio)}-{formatearHora(scheduleItem.hora_fin)}{' '}
                            </CTableDataCell>
                            <CTableDataCell>{scheduleItem.asignatura_sabado}</CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
              </CCollapse>
              <CCollapse visible={visibleB}>
                <CCard className="mt-3">
                  <CCardBody>
                    <CTable align="middle" className="mb-0 border"  bordered borderColor="primary" hover responsive>
                      <CTableHead color="light">
                        <CTableRow>
                          <CTableHeaderCell scope="col">Hora</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Lunes</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Martes</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Miercoles</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Jueves</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Viernes</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {dataHorario.map((scheduleItem, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell>
                              {formatearHora(scheduleItem.hora_inicio)}-{formatearHora(scheduleItem.hora_fin)}{' '}
                            </CTableDataCell>
                            <CTableDataCell>{scheduleItem.asignatura_lunes}</CTableDataCell>
                            <CTableDataCell>{scheduleItem.asignatura_martes}</CTableDataCell>
                            <CTableDataCell>{scheduleItem.asignatura_miercoles}</CTableDataCell>
                            <CTableDataCell>{scheduleItem.asignatura_jueves}</CTableDataCell>
                            <CTableDataCell>{scheduleItem.asignatura_viernes}</CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
              </CCollapse>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="primary"
              onClick={() =>
                dispatch({
                  type: typesModal.MODAL_INFO_SALONES,
                  modalInfoSalonesShow: false,
                })
              }
            >
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  )
}
