import React, { useEffect, useState } from 'react'
import { agregarSalon, eliminarSalon, getAllSalon, getSalon } from '../../api/SalonService'
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
  CCol,
  CRow,
  CTooltip,
  CFormLabel,
  CForm,
  CFormInput,
} from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
/* MENU react-contexify */
import 'react-contexify/dist/ReactContexify.css'
import {
  cilContrast,
  cilMoon,
  cilNotes,
  cilOptions,
  cilPencil,
  cilPlus,
  cilSun,
  cilTrash,
} from '@coreui/icons'
import { getHorarioSalon, getHorarioSalonSabado } from '../../api/HorarioClasesService'
import { typesSalones } from '../../actions/salonAction'
//para la alerta
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'

const AppSalones = () => {
  const [dataList, setDataList] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [visible, setVisible] = useState(false)
  const [tipoSalon, setTipoSalon] = useState('Aula')
  const [codigoSalon, setCodigoSalon] = useState('')
  const [codigoSalonAnt, setCodigoSalonAnt] = useState('')
  const [nombreSalon, setNombreSalon] = useState('')
  const [capacidadSalon, setCapacidadSalon] = useState(25)
  const [idSalon, setIdSalon] = useState(0)
  const [ubicacion, setUbicacion] = useState('SANJOSE')
  const [tipoCrearModificar, setTipoCrearModificar] = useState('')
  const [readOnlyCodigoSalon, setReadOnlyCodigoSalon] = useState(false)

  const cookies = new Cookies()



  useEffect(() => {
    async function fetchData() {
      const data = await getAllSalon()
      setDataList(data.data.body)
    }
    fetchData()
  }, []) // Solo se ejecuta cuando 'count' cambia

  const showModal = async (tipo, objeto) => {
    setVisible(!visible)
    if (tipo === 'crear') {
      setTipoCrearModificar(tipo)
      setTipoSalon('Aula')
      setCodigoSalon('')
      setNombreSalon('')
      setCapacidadSalon(25)
      setUbicacion('SANJOSE')
      setReadOnlyCodigoSalon(false)
      setIdSalon(null)
      setCodigoSalonAnt('')
    } else {
      setTipoSalon(objeto.tiposalon)
      setCodigoSalon(objeto.codigo_salon)
      setNombreSalon(objeto.nombresalon)
      setCapacidadSalon(objeto.capacidadsalon)
      setUbicacion(objeto.ubicacion)
      setReadOnlyCodigoSalon(true)
      setCodigoSalonAnt(objeto.codigo_salon)
      if (objeto.id) {
        setIdSalon(objeto.id)
      } else {
        const dataSalonQuery = await getSalon(codigoSalon)
        setIdSalon(dataSalonQuery.data.body[0].id)
      }

    }
  }

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

    const dataHorarioSalonSabado = await getHorarioSalonSabado(codigo)

    dispatch({
      type: typesSalones.INFO_SALON_SABADO,
      horarioSalonDataSabado: dataHorarioSalonSabado.data.body,
    })

    navigate('/salon/agregarhorario')
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
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
        await guardarSalon();
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

  const guardarSalon = async (event) => {
    if (tipoCrearModificar === 'crear') {
      const dataSalon = await getSalon(codigoSalon)
      if (dataSalon.data.body[0]) {
        Swal.fire({
          title: 'Duplicidad',
          text: 'El salon ya existe con ese codigo!',
          icon: 'error',
        })
      } else {
        const data = {
          codigo_salon: codigoSalon,
          nombresalon: nombreSalon,
          capacidadsalon: capacidadSalon,
          ubicacion: ubicacion,
          tiposalon: tipoSalon,
        }
        const datainsert = await agregarSalon(data)
        if (datainsert) {
          Swal.fire({
            title: 'Creado',
            text: 'Creado correctamente!',
            icon: 'success',
          })
          actualizarTabla();
          setDataList([...dataList, data])
          setVisible(!visible)
        }
      }
    } else {
      if (codigoSalonAnt != codigoSalon) {
        const dataSalonQuery = await getSalon(codigoSalon)
        if (dataSalonQuery.data.body.length > 0) {
          Swal.fire({
            title: 'Upps',
            text: 'ya existe la asignatura con el codigo ' + codigoSalon,
            icon: 'error',
          })
        }
      } else {

      }
      const data = {
        codigo_salon: codigoSalon,
        nombresalon: nombreSalon,
        capacidadsalon: capacidadSalon,
        id: idSalon,
        ubicacion: ubicacion,
        tiposalon: tipoSalon,
      }

      const datainsert = await agregarSalon(data)

      if (datainsert) {
        Swal.fire({
          title: 'Actualizado',
          text: 'Actualizado correctamente!',
          icon: 'success',
        })
        setVisible(!visible)
        actualizarTabla();
        const nuevaLista = dataList.map((objeto) => {
          if (objeto.id === idSalon) {
            // Actualizamos el nombre del objeto con el ID correspondiente
            return {
              ...objeto,
              codigo_salon: codigoSalon,
              nombresalon: nombreSalon,
              capacidadsalon: capacidadSalon,
              ubicacion: ubicacion,
              tiposalon: tipoSalon,
            }
          }
          return objeto // Devolvemos el objeto sin cambios si no es el que queremos actualizar
        })

        // Actualizamos el estado con la nueva lista
        setDataList(nuevaLista)
      }
    }
    event.preventDefault()
  }

  // Función para eliminar un usuario
  const eliminar = async (tipo, salon) => {
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
        const deletesalon = await eliminarSalon(salon)
        if (deletesalon && deletesalon.status === 200) {
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
    const datas = await getAllSalon()
    if (datas) {
      setDataList(datas.data.body)
    }

  }

  // Filtrar las asignaturas basadas en el término de búsqueda
  const filteredSalon = dataList.filter(
    (asignatura) =>
      asignatura.codigo_salon.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asignatura.nombresalon.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div className="mb-3">
        <h4 className="text-center">Salones</h4>
        {/* Campo de búsqueda */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar aula por codigo o nombre"
          value={searchTerm}
          onChange={handleSearchChange}
        />


        {cookies.get('rol') === 'administrador' || cookies.get('rol') === 'Superadministrador' ? (<>
          <CRow>
            <CCol sm={11}></CCol>
            <CCol sm={1}>
              <CTooltip content="Agregar salon">
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

        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Codigo salon</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nombre salon</CTableHeaderCell>
              <CTableHeaderCell scope="col">Capacidad</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ubicación </CTableHeaderCell>
              <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
              {cookies.get('rol') === 'administrador' || cookies.get('rol') === 'Superadministrador' ? (<>
                <CTableHeaderCell scope="col">Opciones</CTableHeaderCell>

              </>) : null}

            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredSalon.map((scheduleItem, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  {scheduleItem.hora_inicio}-{scheduleItem.hora_fin}{' '}
                </CTableDataCell>
                <CTableDataCell>{scheduleItem.codigo_salon}</CTableDataCell>
                <CTableDataCell>{scheduleItem.nombresalon}</CTableDataCell>
                <CTableDataCell>{scheduleItem.capacidadsalon}</CTableDataCell>
                <CTableDataCell>{scheduleItem.ubicacion}</CTableDataCell>
                <CTableDataCell>{scheduleItem.tiposalon}</CTableDataCell>



                {cookies.get('rol') === 'administrador' || cookies.get('rol') === 'Superadministrador' ? (<>
                  <CTableDataCell>
                    <button
                      className="btn btn-primary"
                      title="Agregar Horario"
                      onClick={() => obtenerDetalleSalones(scheduleItem.codigo_salon)}
                    >
                      <CIcon icon={cilPlus} size="lg" />
                    </button>
                    <button
                      className="btn"
                      title="Actualizar salon"
                      onClick={() => showModal('actualizar', scheduleItem)}
                    >
                      <CIcon icon={cilPencil} />
                    </button>

                    <button
                      className="btn btn-danger"
                      title="Eliminar salon"
                      onClick={() => eliminar('eliminar', scheduleItem)}
                    >
                      <CIcon icon={cilTrash} />
                    </button>
                  </CTableDataCell>
                </>) : null}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="ScrollingLongContentExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="ScrollingLongContentExampleLabel">
            {tipoCrearModificar === 'crear' ? 'Crear salon' : 'Actualizar salon'}
          </CModalTitle>
        </CModalHeader>
        <CForm autoComplete="off" onSubmit={() => guardar()}>
          <CModalBody>
            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel htmlFor="tiposalon" className="col-sm-2 col-form-label">
                  Tipo salon
                </CFormLabel>
              </CCol>

              <CCol sm={8}>
                <select
                  className="form-control"
                  id="tiposalon"
                  required
                  value={tipoSalon}
                  onChange={(event) => setTipoSalon(event.target.value)}
                >
                  <option value={'Aula'}>Aula</option>
                </select>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel htmlFor="codigo_salon" className="col-sm-2 col-form-label">
                  Codigo salon
                </CFormLabel>
              </CCol>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  required
                  id="codigo_salon"
                  value={codigoSalon}
                  onChange={(event) => setCodigoSalon(event.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel htmlFor="nombresalon" className="col-sm-2 col-form-label">
                  Nombre salon
                </CFormLabel>
              </CCol>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  required
                  id="nombresalon"
                  value={nombreSalon}
                  onChange={(event) => setNombreSalon(event.target.value)}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel htmlFor="capacidadsalon" className="col-sm-2 col-form-label">
                  Capacidad salon
                </CFormLabel>
              </CCol>
              <CCol sm={8}>
                <CFormInput
                  type="number"
                  required
                  id="capacidadsalon"
                  min={1}
                  max={50}
                  value={capacidadSalon}
                  onChange={(event) => setCapacidadSalon(event.target.value)}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel htmlFor="ubicacion" className="col-sm-2 col-form-label">
                  Ubicación
                </CFormLabel>
              </CCol>
              <CCol sm={8}>
                <select
                  required
                  className="form-control"
                  id="ubicacion"
                  value={ubicacion}
                  onChange={(event) => setUbicacion(event.target.value)}
                >
                  <option value={'SANJOSE'}>SANJOSE</option>
                </select>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cerrar
            </CButton>
            <CButton color="primary" type="submit">
              {tipoCrearModificar === 'crear' ? 'Guardar' : 'Guardar cambios'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default AppSalones
