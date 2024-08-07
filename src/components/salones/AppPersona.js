import React, { useEffect, useState } from 'react'
import { getAllPersonas, createPersona, obtenerPersonaNumTipo, eliminarPersona } from '../../api/PersonaService'
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
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CForm,
  CRow,
  CFormLabel,
  CFormInput,
  CCol,
  CFormSwitch,
  CTooltip,
} from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
/* MENU react-contexify */
import 'react-contexify/dist/ReactContexify.css'
import { cilPencil, cilPlus, cilPuzzle, cilTrash, cilUser } from '@coreui/icons'
import { typesPersona } from '../../actions/personaAction'
//para la alerta
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'

const AppPersona = () => {
  const [listPersonas, setListPersonas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [visible, setVisible] = useState(false)

  //formulario de personas

  const [readOnlyTipoId, setReadOnlyTipoId] = useState(false)
  const [tipoId, setTipoId] = useState('CC')
  const [readOnlyNumId, setReadOnlyNumId] = useState(false)
  const [numId, setNumId] = useState('')
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [estado, setEstado] = useState(0)
  const [tipoCrearModificar, setTipoCrearModificar] = useState('')

  //
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const cookies = new Cookies()

  useEffect(() => {
    async function fetchData() {
      const dataListaPersonas = await getAllPersonas()
      setListPersonas(dataListaPersonas.data.body)
    }
    fetchData()
  }, []) // Solo se ejecuta cuando 'count' cambia

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Filtrar las asignaturas basadas en el término de búsqueda
  const filteredAsignaturas = listPersonas.filter(
    (persona) =>
      persona.cod_tipo_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.num_id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const showModal = (tipo, objeto) => {
    setVisible(!visible)
    if (tipo === 'crear') {
      setTipoCrearModificar(tipo)
      setNombres('')
      setApellidos('')
      setEstado(0)
      setTipoId('CC')
      setNumId('')
      setReadOnlyNumId(false)
      setReadOnlyTipoId(false)
    } else {
      setTipoCrearModificar(tipo)
      setNombres(objeto.nombres)
      setApellidos(objeto.apellidos)
      setEstado(objeto.estado)
      setTipoId(objeto.cod_tipo_id)
      setNumId(objeto.num_id)
      setReadOnlyNumId(true)
      setReadOnlyTipoId(true)
    }
  }

  const guardar = async (event) => {
    await Swal.fire({
      title:
        '¿Estás seguro de' + tipoCrearModificar === 'crear'
          ? 'crear el registro?'
          : 'guardar cambios?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí,' + tipoCrearModificar === 'crear' ? 'crear' : 'guardar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await guardarPersona();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'No se realizo ninguna acción!',
          icon: 'error',
        })
      }
    })
    event.preventDefault()
  }

  const guardarPersona = async (event) => {
    if (tipoCrearModificar === 'crear') {
      const dataPersona = await obtenerPersonaNumTipo(numId, tipoId)
      if (dataPersona.data.body[0]) {
        Swal.fire({
          title: 'Alerta',
          text: 'La persona ya existe!',
          icon: 'error',
        })
      } else {
        const data = {
          cod_tipo_id: tipoId,
          num_id: numId,
          nombres: nombres,
          apellidos: apellidos,
          estado: estado,
        }
        const datainsert = await createPersona(data)
        if (datainsert) {
          actualizarTabla();
          Swal.fire({
            title: 'Creado!',
            text: 'El registro ha sido creado.',
            icon: 'success',
          })
          setListPersonas([
            ...listPersonas,
            {
              apellidos: apellidos,
              cod_tipo_id: tipoId,
              estado: estado,
              nombres: nombres,
              num_id: numId,
            },
          ])
          setVisible(!visible)
        }
      }
    } else {
      const dataPersona = await obtenerPersonaNumTipo(numId, tipoId)
      const datainsert = await createPersona({
        apellidos: apellidos,
        cod_tipo_id: tipoId,
        estado: estado,
        id: dataPersona.data.body[0].id,
        nombres: nombres,
        num_id: numId,
      })
      if (datainsert) {
        Swal.fire({
          title: 'Actualizado!',
          text: 'El registro ha sido actualizado.',
          icon: 'success',
        })
        actualizarTabla();
        setVisible(!visible)
        const nuevaLista = listPersonas.map((objeto) => {
          if (objeto.num_id === numId && objeto.cod_tipo_id === tipoId) {
            // Actualizamos el nombre del objeto con el ID correspondiente
            return {
              ...objeto,
              apellidos: apellidos,
              cod_tipo_id: tipoId,
              estado: estado,
              nombres: nombres,
              num_id: numId,
            }
          }
          return objeto // Devolvemos el objeto sin cambios si no es el que queremos actualizar
        })

        // Actualizamos el estado con la nueva lista
        setListPersonas(nuevaLista)
      }
    }
  }

  const obtenerPersona = (persona) => {
    dispatch({
      type: typesPersona.INFO_PERSONA,
      infoPersonaData: persona,
    })
    navigate('/personas/usuario')
  }


  // Función para eliminar un usuario
  const eliminar = async (tipo, persona) => {
    await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteper = await eliminarPersona(persona)
        if (deleteper && deleteper.status === 200) {
          actualizarTabla()
        }

        Swal.fire({
          title: '¡Eliminado!',
          text: 'El registro ha sido eliminado.',
          icon: 'success',
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Tu archivo imaginario está seguro :)',
          icon: 'error',
        })
      }
    })
  }

  const actualizarTabla = async () => {
    const datas = await getAllPersonas()
    if (datas) {
      setListPersonas(datas.data.body)
    }

  }

  return (
    <>
      <div className="mb-3">
        <h4 className="text-center">Persona</h4>
        {/* Campo de búsqueda */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar persona por numero identificación"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {cookies.get('rol') === 'administrador' || cookies.get('rol') === 'Superadministrador' ? (<>
          <CRow>
            <CCol sm={11}></CCol>
            <CCol sm={1}>
              <CTooltip content="Agregar persona">
                <CIcon
                  icon={cilPlus}
                  className="text-primary"
                  style={{ cursor: 'pointer' }}
                  size="xl"
                  onClick={() => showModal('crear', null)}
                />
              </CTooltip>
            </CCol>
          </CRow>
        </>) : null}



        {listPersonas.length > 0 ? (
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">Tipo de identificación</CTableHeaderCell>
                <CTableHeaderCell scope="col">Numero de identificación</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nombres</CTableHeaderCell>
                <CTableHeaderCell scope="col">Apellidos</CTableHeaderCell>
                <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
                {cookies.get('rol') === 'administrador' || cookies.get('rol') === 'Superadministrador' ? (<>
                  <CTableHeaderCell scope="col">Opciones</CTableHeaderCell>

                </>) : null}

              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredAsignaturas.map((scheduleItem, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{scheduleItem.cod_tipo_id}</CTableDataCell>
                  <CTableDataCell>{scheduleItem.num_id}</CTableDataCell>
                  <CTableDataCell>{scheduleItem.nombres}</CTableDataCell>
                  <CTableDataCell>{scheduleItem.apellidos}</CTableDataCell>
                  <CTableDataCell>{scheduleItem.estado}</CTableDataCell>
                  {cookies.get('rol') === 'administrador' || cookies.get('rol') === 'Superadministrador' ? (<>
                    <CTableDataCell>
                      <button
                        className="btn btn-primary"
                        title="Agregar Horario"
                        onClick={() => showModal('actualizar', scheduleItem)}
                      >
                        <CIcon icon={cilPencil} title="Editar" style={{ cursor: 'pointer' }} />
                      </button>
                      <button
                        className="btn btn-primary"
                        title="Agregar Horario"
                        onClick={() => obtenerPersona(scheduleItem)}
                      >
                        <CIcon icon={cilUser} title="Roles" style={{ cursor: 'pointer' }} />
                      </button>

                      <button
                        className="btn btn-danger"
                        title="Eliminar persona"
                        onClick={() => eliminar('eliminar', scheduleItem)}
                      >
                        <CIcon icon={cilTrash} />
                      </button>
                    </CTableDataCell>
                  </>) : null}


                </CTableRow>
              ))}
            </CTableBody>
          </CTable>) : ''}


      </div>

      <>
        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="ScrollingLongContentExampleLabel"
        >
          <CModalHeader>
            <CModalTitle id="ScrollingLongContentExampleLabel">
              {tipoCrearModificar === 'crear' ? 'Crear persona' : 'Actualizar persona'}
            </CModalTitle>
          </CModalHeader>
          <CForm autoComplete="off" onSubmit={() => guardar()}>
            <CModalBody>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="cod_tipo_id" className="col-sm-2 col-form-label">
                    Tipo identificación
                  </CFormLabel>
                </CCol>

                <CCol sm={8}>
                  <select
                    className="form-control"
                    id="cod_tipo_id"
                    value={tipoId}
                    disabled={readOnlyTipoId}
                    required
                    onChange={(event) => setTipoId(event.target.value)}
                  >
                    <option value={'CC'}>Cedula de ciudadania</option>
                    <option value={'TI'}>Tarjeta de identidad</option>
                  </select>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="num_id" className="col-sm-2 col-form-label">
                    Numero de identificación
                  </CFormLabel>
                </CCol>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    id="num_id"
                    value={numId}
                    disabled={readOnlyNumId}
                    onChange={(event) => setNumId(event.target.value)}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="nombres" className="col-sm-2 col-form-label">
                    Nombres completos
                  </CFormLabel>
                </CCol>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    id="nombres"
                    value={nombres}
                    onChange={(event) => setNombres(event.target.value)}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="apellidos" className="col-sm-2 col-form-label">
                    Apellidos completos
                  </CFormLabel>
                </CCol>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    id="apellidos"
                    value={apellidos}
                    onChange={(event) => setApellidos(event.target.value)}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="apellidos" className="col-sm-2 col-form-label">
                    Estado
                  </CFormLabel>
                </CCol>
                <CCol sm={8}>
                  <select
                    className="form-control"
                    id="cod_tipo_id"
                    value={estado}
                    onChange={(event) => setEstado(event.target.value)}
                    required
                  >
                    <option value={1}>Activar</option>
                    <option value={0}>Inactivar</option>
                  </select>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Cerrar
              </CButton>
              <CButton color="primary" type="submit">
                {tipoCrearModificar === 'crear' ? 'Guardar' : ' Guardar cambios'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </>
    </>
  )
}

export default AppPersona
