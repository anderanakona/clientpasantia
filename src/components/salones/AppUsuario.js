import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
import { cilPencil, cilPlus, cilTrash, cilUserX } from '@coreui/icons'
import {
  getAllRol,
  buscarusuarioUnico,
  agregarUsuario,
  getAllRolIdPersona,
  imprimirRol,
  eliminarUsuario,
} from '../../api/UsuarioService'
import { agregarProfesor, obtenerProfesorCodigo, obtenerProfesorPersona } from '../../api/ProfesorService'
import { useNavigate } from 'react-router-dom'
//para la alerta
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'

const AppUsuario = () => {
  const [listRoles, setListRoles] = useState([])
  const [dataPersona, setDataPersona] = useState([])
  const [listRolPersona, setListRolPersona] = useState([])
  const per = useSelector((state) => state.personaReducer.infoPersonaData)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [visibleContrasena, setVisibleContrasena] = useState(false)
  const [rolSelect, setRolSelect] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [nombreUsuarioAnt, setNombreUsuarioAnt] = useState('')
  const [email, setEmail] = useState('')
  const [tipoCrearModificar, setTipoCrearModificar] = useState('')
  const [readOnly, setReadOnly] = useState(false)
  const [listTodosRoles, setListTodosRoles] = useState([])
  const [telefonoProfesor, setTelefonoProfesor] = useState('');
  const [codigoProfesor, setCodigoProfesor] = useState('');
  const [codigoProfesorAnt, setCodigoProfesorAnt] = useState('');
  const [idProfesor, setIdProfesor] = useState(0)

  const cookies = new Cookies()


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

      const dataRolPersona = await getAllRolIdPersona(dataPersona.id)
      if (dataRolPersona) {
        setListRolPersona(dataRolPersona.data.body)
      }
      const dataAllRol = await imprimirRol()
      if (dataAllRol) {
        setListTodosRoles(dataAllRol.data.body)
      }
    }
  }, [setDataPersona, dataPersona]) // Solo se ejecuta cuando 'count' cambia

  useEffect(() => {
    async function fetchData() {
      if (per.length === 0) {
        navigate('/persona')

      }
    }
    fetchData()
  }, []) // Solo se ejecuta cuando 'count' cambia


  const showModalRol = async (tipo, objeto) => {
    setVisible(!visible)
    if (tipo === 'crear') {
      setTipoCrearModificar(tipo)
      vaciarFormulario()
      setReadOnly(false)
      setNombreUsuarioAnt('')
      setCodigoProfesorAnt('')
      setCodigoProfesor('')
      setTelefonoProfesor('')
      setCodigoProfesorAnt('')
      setCodigoProfesor('')
      setTelefonoProfesor('')
      setIdProfesor(0)
    } else {
      setTipoCrearModificar(tipo)
      setNombreUsuario(objeto.nombre_usuario)
      setEmail(objeto.email)
      setRolSelect(objeto.id_rol)
      setReadOnly(true)
      if (objeto.id_rol === 2) {
        const dataprofesor = await obtenerProfesorPersona(dataPersona.id)
        setCodigoProfesorAnt(dataprofesor.data.body[0].codigo_profesor)
        setCodigoProfesor(dataprofesor.data.body[0].codigo_profesor)
        setTelefonoProfesor(dataprofesor.data.body[0].telefono)
        setIdProfesor(dataprofesor.data.body[0].id)
      }
      setNombreUsuarioAnt(objeto.nombre_usuario)
    }
  }

  const showModalContrasena = async (tipo, objeto) => {
    setVisibleContrasena(!visibleContrasena)
    if (tipo === 'actualizar') {
      setTipoCrearModificar(tipo)
      setNombreUsuario(objeto.nombre_usuario)
    }
  }

  const seleccionarRol = async (event) => {
    await Swal.fire({
      title:
        '¿Estás seguro de' + tipoCrearModificar === 'crear'
          ? 'crear el registro?'
          : 'guardar cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí,' + tipoCrearModificar === 'crear' ? 'crear!' : 'guardar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await seleccionarRolMensaje()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'No se realizo ninguna acción:)',
          icon: 'error',
        })
      }
    })
    event.preventDefault()
  }

  const seleccionarRolMensaje = async (event) => {
    if (tipoCrearModificar === 'crear') {
      const dataNombreUsuario = await buscarusuarioUnico(nombreUsuario)
      if (dataNombreUsuario.data.body) {
        Swal.fire({
          title: 'Upps',
          text: 'El usuario ya existe',
          icon: 'error',
        })
      } else {
        const data = {
          id_persona: dataPersona.id,
          nombre_usuario: nombreUsuario,
          email: email,
          contrasena: contrasena,
          id_rol: rolSelect,
          rol: rolSelect,
        }

        ///para mirar si el rol es 2 profesor
        if (rolSelect == 2) {
          if (codigoProfesor != codigoProfesorAnt) {
            const dataPr = await obtenerProfesorCodigo(codigoProfesor);
            if (dataPr.data.body.length > 0) {
              Swal.fire({
                title: 'Upps',
                text: 'El profesor ya existe con este codigo ' + codigoProfesor,
                icon: 'error',
              })
            } else {
              const datainsert = await agregarUsuario(data)
              insertarProfesor();
              if (datainsert) {
                Swal.fire({
                  title: '¡Creado!',
                  text: 'El registro ha sido creado.',
                  icon: 'success',
                })
                setVisible(!visible)
                await actualizarTablaRoles()
              }
            }

          } else {
            const datainsert = await agregarUsuario(data)
            insertarProfesor();
            if (datainsert) {
              Swal.fire({
                title: '¡Creado!',
                text: 'El registro ha sido creado.',
                icon: 'success',
              })
              setVisible(!visible)
              await actualizarTablaRoles()
            }
          }

        } else {
          const datainsert = await agregarUsuario(data)
          if (datainsert) {
            Swal.fire({
              title: '¡Creado!',
              text: 'El registro ha sido creado.',
              icon: 'success',
            })
            setVisible(!visible)
            await actualizarTablaRoles()
          }
        }


      }
    } else {
      const dataNombreUsuario = await buscarusuarioUnico(nombreUsuarioAnt)
      const data1 = {
        id: dataNombreUsuario.data.body.id,
        id_persona: dataPersona.id,
        nombre_usuario: nombreUsuario,
        email: email,
        id_rol: rolSelect,
        rol: rolSelect,
      }
      if (nombreUsuario != nombreUsuarioAnt) {
        const dataNombreUsuario2 = await buscarusuarioUnico(nombreUsuario)
        if (dataNombreUsuario2.data.body) {
          Swal.fire({
            title: 'Upps',
            text: 'ya existe con otro nombre de usuario ',
            icon: 'error',
          })
        } else {


          if (rolSelect == 2) {
            if (codigoProfesor != codigoProfesorAnt) {
              const dataPr = await obtenerProfesorCodigo(codigoProfesor);
              if (dataPr.data.body.length > 0) {
                Swal.fire({
                  title: 'Upps',
                  text: 'El profesor ya existe con este codigo ' + codigoProfesor,
                  icon: 'error',
                })
              } else {
                const datainsert = await agregarUsuario(data1)
                actualizarProfesor();
                if (datainsert) {
                  Swal.fire({
                    title: 'Actualizado!',
                    text: 'El registro ha sido actualizado.',
                    icon: 'success',
                  })
                  setVisible(!visible)
                  await actualizarTablaRoles()
                }
              }
            } else {
              const datainsert = await agregarUsuario(data1)
              actualizarProfesor();
              if (datainsert) {
                Swal.fire({
                  title: 'Actualizado!',
                  text: 'El registro ha sido actualizado.',
                  icon: 'success',
                })
                setVisible(!visible)
                await actualizarTablaRoles()
              }
            }
          } else {
            const datainsert = await agregarUsuario(data1)
            actualizarProfesor();
            if (datainsert) {
              Swal.fire({
                title: 'Actualizado!',
                text: 'El registro ha sido actualizado.',
                icon: 'success',
              })
              setVisible(!visible)
              await actualizarTablaRoles()
            }
          }

        }
      } else {
        const datainsert = await agregarUsuario(data1)
        actualizarProfesor();
        if (datainsert) {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'El registro ha sido actualizado.',
            icon: 'success',
          })
          setVisible(!visible)
          await actualizarTablaRoles()
        }
      }
    }
  }

  const insertarProfesor = async () => {

    const dataInsertProfesor = await agregarProfesor({

      codigo_profesor: codigoProfesor,
      email: email, telefono: telefonoProfesor, id_persona: dataPersona.id
    })
    if (dataInsertProfesor) {
      Swal.fire({
        icon: "success",
        title: "¡Profesor creado correctamente!",
      });
    }


  }

  const actualizarProfesor = async () => {

    const dataInsertProfesor = await agregarProfesor({
      id: idProfesor,
      codigo_profesor: codigoProfesor,
      email: email, telefono: telefonoProfesor, id_persona: dataPersona.id
    })
    console.log(333)
    if (dataInsertProfesor) {
      Swal.fire({
        icon: "success",
        title: "¡Profesor actualizado correctamente!",
      });
    }


  }

  const updateContrasena = async (event) => {
    if (tipoCrearModificar === 'actualizar') {
      const dataNombreUsuario = await buscarusuarioUnico(nombreUsuario)
      const data1 = {
        id: dataNombreUsuario.data.body.id,
        contrasena: contrasena,
      }
      const datainsert = await agregarUsuario(data1)
      if (datainsert) {
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Actualización de contraseña correcta',
          icon: 'success',
        })
        setVisibleContrasena(!visibleContrasena)
        await actualizarTablaRoles()
      }
    }
  }

  const guardarContrasena = async (event) => {
    await Swal.fire({
      title: '¿Estás seguro de guardar cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateContrasena()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'No se realizo ninguna acción:)',
          icon: 'error',
        })
      }
    })
    event.preventDefault()
  }

  const vaciarFormulario = () => {
    setRolSelect('')
    setContrasena('')
    setNombreUsuario('')
    setEmail('')
  }

  // Función para eliminar un usuario
  const actualizarTablaRoles = async () => {
    const dataRol = await getAllRol(dataPersona.id)
    if (dataRol) {
      setListRoles(dataRol.data.body)
    }
    const dataR = await getAllRolIdPersona(dataPersona.id)
    if (dataR) {
      setListRolPersona(dataR.data.body)
    }
  }

  // Función para eliminar un usuario
  const eliminarRol = async (tipo, usuario) => {
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
        const deleteRol = await eliminarUsuario(usuario)
        if (deleteRol && deleteRol.status === 200) {
          actualizarTablaRoles()
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

  return (
    <>
      <div className="mb-3">
        <h4 className="text-center">
          {dataPersona.nombres} {dataPersona.apellidos}
        </h4>
        <CRow>
          <CCol sm={8}></CCol>
          <CCol sm={2}>
            <CTooltip content="Agregar rol">
              <CIcon
                icon={cilPlus}
                className="text-primary"
                style={{ cursor: 'pointer' }}
                size="xl"
                onClick={() => showModalRol('crear', null)}
              />
            </CTooltip>
          </CCol>
          <CCol sm={2}></CCol>
        </CRow>
        { }
        {listRolPersona.length > 0 ? (
          <>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">Nombres usuario </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Rol </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acciones </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {listRolPersona.map((scheduleItem, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{scheduleItem.nombre_usuario}</CTableDataCell>
                    <CTableDataCell>{scheduleItem.email}</CTableDataCell>
                    <CTableDataCell>{scheduleItem.descripcion}</CTableDataCell>
                    <CTableDataCell>
                      <button
                        className="btn btn-primary"
                        title="Actualizar usuario"
                        onClick={() => showModalRol('actualizar', scheduleItem)}
                      >
                        <CIcon icon={cilPencil} />
                      </button>

                      <button
                        className="btn btn-danger"
                        title="Eliminar usuario"
                        onClick={() => eliminarRol('eliminar', scheduleItem)}
                      >
                        <CIcon icon={cilTrash} />
                      </button>

                      <button
                        className="btn btn-success"
                        title="Editar contraseña"
                        onClick={() => showModalContrasena('actualizar', scheduleItem)}
                      >
                        <CIcon icon={cilUserX} />
                      </button>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </>
        ) : (
          ''
        )}
      </div>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="ScrollingLongContentExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="ScrollingLongContentExampleLabel">
            {tipoCrearModificar === 'crear' ? 'Agregar de rol a ' : 'Actualizar '}
            {dataPersona.nombres} {dataPersona.apellidos}
          </CModalTitle>
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
                {tipoCrearModificar === 'crear' ? (
                  <select
                    className="form-control"
                    id="rolid"
                    required
                    value={rolSelect}
                    onChange={(event) => setRolSelect(event.target.value)}
                  >
                    <option value={''}>Seleccionar rol</option>
                    
                    {listRoles
                      .filter((role) => role.descripcion.toLowerCase() !== 'Superadministrador')
                      .map((scheduleItem, index) => (
                        <option key={index} value={scheduleItem.id}>
                          {scheduleItem.descripcion}
                        </option>
                      ))}
                  </select>
                ) : (
                  <select
                    className="form-control"
                    id="rolid"
                    required
                    disabled={true}
                    value={rolSelect}
                    onChange={(event) => setRolSelect(event.target.value)}
                  >
                    {listTodosRoles.map((scheduleItem, index) => (
                      <option key={index} value={scheduleItem.id}>
                        {scheduleItem.descripcion}
                      </option>
                    ))}
                  </select>
                )}
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
            {tipoCrearModificar === 'crear' ? (
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="contrasena" className="col-sm-2 col-form-label">
                    Contraseña{' '}
                  </CFormLabel>
                </CCol>

                <CCol sm={8}>
                  <input
                    type="password"
                    className="form-control"
                    required
                    id="contrasena"
                    value={contrasena}
                    onChange={(event) => setContrasena(event.target.value)}
                  ></input>
                </CCol>
              </CRow>
            ) : (
              ''
            )}

            {rolSelect == 2 ? (<>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="codigoProfesor" className="col-sm-2 col-form-label">
                    Codigo profesor{' '}
                  </CFormLabel>
                </CCol>

                <CCol sm={8}>
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="codigoProfesor"
                    value={codigoProfesor}
                    onChange={(event) => setCodigoProfesor(event.target.value)}
                  ></input>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="telefonoProfesor" className="col-sm-2 col-form-label">
                    Telefono{' '}
                  </CFormLabel>
                </CCol>

                <CCol sm={8}>
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="telefonoProfesor"
                    value={telefonoProfesor}
                    onChange={(event) => setTelefonoProfesor(event.target.value)}
                  ></input>
                </CCol>
              </CRow></>) : ''}

          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit">
              {tipoCrearModificar === 'crear' ? 'Guardar' : 'Guardar cambios'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      <CModal
        visible={visibleContrasena}
        onClose={() => setVisibleContrasena(false)}
        aria-labelledby="ScrollingLongContentExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="ScrollingLongContentExampleLabel">{'Editar contraseña'}</CModalTitle>
        </CModalHeader>
        <CForm autoComplete="off" onSubmit={() => guardarContrasena()}>
          <CModalBody>
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
                  disabled={true}
                  value={nombreUsuario}
                  onChange={(event) => setNombreUsuario(event.target.value)}
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
                <input
                  type="password"
                  className="form-control"
                  required
                  id="contrasena"
                  value={contrasena}
                  onChange={(event) => setContrasena(event.target.value)}
                ></input>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleContrasena(false)}>
              Cancelar
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

export default AppUsuario
