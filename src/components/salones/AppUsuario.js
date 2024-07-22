import React, { useEffect, useState } from 'react'
import { getAllSalon, getSalon } from '../../api/SalonService'
import { useDispatch, useSelector } from 'react-redux'
// Si tienes estilos específicos para este componente
import './ImageContainer.css' // Si tienes estilos específicos para este componente
/* COREUI */
import {
  CTableHeaderCell,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CTooltip,
  CButton,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
  CForm,
  CFormLabel,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
/* MENU react-contexify */
import { obtenerPersonaNumTipo } from '../../api/PersonaService'
import { cilPlus } from '@coreui/icons'
import { getAllRol } from '../../api/UsuarioService'
import { useNavigate } from 'react-router-dom'

const AppUsuario = () => {
  const [listRoles, setListRoles] = useState([])
  const [dataPersona, setDataPersona] = useState([])
  const per = useSelector((state) => state.personaReducer.infoPersonaData)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [rolSelect, setRolSelect] = useState('')
  const [constrasena, setContrasena] = useState('')
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (per.nombres === undefined) {
      navigate('/personas/')
    } else {
      fetchData()
    }

    async function fetchData() {
      if (per.id === 0 || per.id === undefined || per.id == null) {
        const dataPersona = await obtenerPersonaNumTipo(per.num_id, per.cod_tipo_id)
        setDataPersona(dataPersona.data.body[0])
      } else {
        setDataPersona(per)
      }
      const dataRol = await getAllRol(dataPersona.id)
      if (dataRol) {
        setListRoles(dataRol.data.body)
      }
    }
  }, [setDataPersona, dataPersona]) // Solo se ejecuta cuando 'count' cambia

  const showModalRol = (tipo, objeto)=> {
    setVisible(!visible)
    if(tipo==='crear'){
        vaciarFormulario()
    }
  }

  const seleccionarRol = (event) => {
    event.preventDefault()
  }
  const vaciarFormulario=()=>{
    setRolSelect('')
    setContrasena('')
    setNombreUsuario('')
    setEmail('')
  }

  return (
    <>
      <div className="mb-3">
        <h4 className="text-center">
          {dataPersona.nombres} {dataPersona.apellidos}
        </h4>
        <CRow>
          <CCol sm={10}></CCol>
          <CCol sm={1}>
            <CTooltip content="Agregar rol">
              <CIcon
                icon={cilPlus}
                className="text-primary"
                style={{ cursor: 'pointer' }}
                size="xl"
                onClick={() => showModalRol("crear",null)}
              />
            </CTooltip>
          </CCol>
          <CCol sm={1}></CCol>
        </CRow>
      </div>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="ScrollingLongContentExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="ScrollingLongContentExampleLabel">Agregar de rol</CModalTitle>
        </CModalHeader>
        <CForm autoComplete="off" onSubmit={() => seleccionarRol()}>
          <CModalBody>
            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel htmlFor="rolid" className="col-sm-2 col-form-label">
                  Rol
                </CFormLabel>
              </CCol>

              <CCol sm={8}>
                <select
                  className="form-control"
                  id="rolid"
                  required
                  value={rolSelect}
                  onChange={(event) => setRolSelect(event.target.value)}
                >
                  <option value={''}>Seleccionar rol</option>
                  {listRoles.map((scheduleItem, index) => (
                    <option key={index} value={scheduleItem.id}>
                      {scheduleItem.descripcion}
                    </option>
                  ))}
                </select>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel htmlFor="nombre_usuario" className="col-sm-2 col-form-label">
                  Nombre usuario
                </CFormLabel>
              </CCol>

              <CCol sm={8}>
                <CFormInput
                  type="text"
                  required
                  id="nombre_usuario"
                  value={nombreUsuario}
                  onChange={(event) => setNombreUsuario(event.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                  Correo electronico{' '}
                </CFormLabel>
              </CCol>

              <CCol sm={8}>
                <CFormInput
                  type="email"
                  required
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel htmlFor="contrasena" className="col-sm-2 col-form-label">
                  Contraseña{' '}
                </CFormLabel>
              </CCol>

              <CCol sm={8}>
                <CFormInput
                  type="password"
                  required
                  id="contrasena"
                  value={constrasena}
                  onChange={(event) => setContrasena(event.target.value)}
                />
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit">
              Agregar rol
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default AppUsuario
