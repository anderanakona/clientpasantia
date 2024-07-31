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
  CTooltip,
  CForm,
  CFormLabel,
  CFormInput,
} from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
/* MENU react-contexify */
import 'react-contexify/dist/ReactContexify.css'
import { cilContrast, cilMoon, cilNotes, cilOptions, cilPencil, cilPlus, cilSun, cilTrash } from '@coreui/icons'
import { getHorarioSalon } from '../../api/HorarioClasesService'
import { agregarAsignatura, eliminarAsignaturaREST, getAllAsignatura, obtenerAsignaturaCodigo } from '../../api/AsignaturaService'
import { typesSalones } from '../../actions/salonAction'
import { getAllFacultad } from '../../api/FacultadService'
//para la alerta
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'

const AppAsignatura = () => {

  const [listAsignaturas, setListAsignaturas] = useState([])
  const [listFacultades, setListFacultades] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(false);
  const [tipoCrearModificar, setTipoCrearModificar] = useState('crear');
  const [codigoAsignatura, setCodigoAsignatura] = useState('');
  const [codigoAsignaturaAnt, setCodigoAsignaturaAnt] = useState('');
  const [nombreAsignatura, setNombreAsignatura] = useState('');
  const [facultad, setFacultad] = useState(0);
  const [idAsignatura, setIdAsignatura]=useState(0);
  const cookies = new Cookies()





  useEffect(() => {
    async function fetchData() {

      const dataListaAsigna = await getAllAsignatura()
      setListAsignaturas(dataListaAsigna.data.body)
      const dataListaFacultades = await getAllFacultad()
      setListFacultades(dataListaFacultades.data.body)


    }
    fetchData()
  }, []) // Solo se ejecuta cuando 'count' cambia

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //abrir modal de crear o actualizar
  const showModal = async(tipo, objecto) => {
    setVisible(true)
    if (tipo === "crear") {
      setCodigoAsignatura('');
      setFacultad(0);
      setNombreAsignatura('')
      setCodigoAsignaturaAnt('')
      setIdAsignatura(null)
    } else {
      setCodigoAsignatura(objecto.codigo);
      setFacultad(objecto.id_facultad);
      setNombreAsignatura(objecto.nombre)
      setCodigoAsignaturaAnt(objecto.codigo)
      if(objecto.id){
        setIdAsignatura(objecto.id)
      }else{
        const dataAsignatura = await obtenerAsignaturaCodigo(codigoAsignatura)
        setIdAsignatura(dataAsignatura.data.body[0].id)
      }

      console.log(objecto)
    }
    setTipoCrearModificar(tipo)
  }

  const guardarOnsubmit = async (event) => {
    if (tipoCrearModificar === 'crear') {
      const dataAsignatura = await obtenerAsignaturaCodigo(codigoAsignatura)
      if (dataAsignatura.data.body[0]) {
        Swal.fire({
          title: 'Alerta',
          text: 'La asignatura ya existe con ese codigo!',
          icon: 'error',
        })
      } else {
        const data = {
          nombre: nombreAsignatura,
          codigo: codigoAsignatura,
          id_facultad: facultad
        };
        const datainsert = await agregarAsignatura(data)
        if (datainsert) {
          Swal.fire({
            title: 'Creado!',
            text: 'El registro ha sido creado.',
            icon: 'success',
          })
          const dataAsignatura2 = await obtenerAsignaturaCodigo(codigoAsignatura)

          setListAsignaturas([
            ...listAsignaturas,
            {
              nombre: nombreAsignatura,
              codigo: codigoAsignatura,
              id_facultad: facultad,
              nombrefacultad: dataAsignatura2.data.body[0].nombrefacultad
            },
          ])
          setVisible(!visible)
        }
      }
    } else {
      
      if (codigoAsignaturaAnt != codigoAsignatura) {
        const dataAsignaturaQuery = await obtenerAsignaturaCodigo(codigoAsignatura)     
        if (dataAsignaturaQuery.data.body.length>0) {
          Swal.fire({
            title: 'Upps',
            text: 'ya existe la asignatura con el codigo '+codigoAsignatura,
            icon: 'error',
          })
        }else{
          const data = {
            id: idAsignatura,
            nombre: nombreAsignatura,
            codigo: codigoAsignatura,
            id_facultad: facultad
          }
          const datainsert = await agregarAsignatura(data)
          if (datainsert) {
            Swal.fire({
              title: 'Actualizado',
              text: 'Actualizado correctamente!',
              icon: 'success',
            })
          }
        }
      } else {
        const data = {
          id: idAsignatura,
          nombre: nombreAsignatura,
          codigo: codigoAsignatura,
          id_facultad: facultad
        }
        const datainsert = await agregarAsignatura(data)
        if (datainsert) {
          Swal.fire({
            title: 'Actualizado',
            text: 'Actualizado correctamente!',
            icon: 'success',
          })
        }

      }
      

      const dataAsignatura2 = await obtenerAsignaturaCodigo(codigoAsignatura)
      setVisible(!visible)

      const nuevaLista = listAsignaturas.map((objeto) => {
        if (objeto.id === idAsignatura) {
          // Actualizamos el nombre del objeto con el ID correspondiente
          return {
            ...objeto,
            id: dataAsignatura2.data.body[0].id,
            nombre: nombreAsignatura,
            codigo: codigoAsignatura,
            id_facultad: facultad,
            nombrefacultad: dataAsignatura2.data.body[0].nombrefacultad
          }
        }
        return objeto // Devolvemos el objeto sin cambios si no es el que queremos actualizar
      })

      // Actualizamos el estado con la nueva lista
      setListAsignaturas(nuevaLista)
    }
    event.preventDefault()
  }

  const guardar = async (event) => {
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
        await guardarOnsubmit()
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



  // Función para eliminar un usuario
  const actualizarTabla = async () => {
    const dataAs = await getAllAsignatura()
    if (dataAs) {
      setListAsignaturas(dataAs.data.body)
    }
  }

  // Función para eliminar un usuario
  const eliminarAsignatura = async (tipo, as) => {
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
        const deleteAsignatura = await eliminarAsignaturaREST(as)
        if (deleteAsignatura && deleteAsignatura.status === 200) {
          actualizarTabla();
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

  //nombre	codigo	id_facultad

  // Filtrar las asignaturas basadas en el término de búsqueda
  const filteredAsignaturas = listAsignaturas.filter((asignatura) =>
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

{cookies.get('rol') === 'administrador' || cookies.get('rol') === 'Superadministrador' ? (<CRow>
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
        </CRow>) : null}

        

        {listAsignaturas.length > 0 ? (
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">Codigo asignatura</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nombre asignatura</CTableHeaderCell>
                <CTableHeaderCell scope="col">Facultad </CTableHeaderCell>
                {cookies.get('rol') === 'administrador' || cookies.get('rol') === 'Superadministrador' ? 
                (<CTableHeaderCell
                    scope="col">Acciones </CTableHeaderCell>): cookies.get('rol')}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredAsignaturas.map((scheduleItem, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    {scheduleItem.codigo}
                  </CTableDataCell>
                  <CTableDataCell>{scheduleItem.nombre}</CTableDataCell>
                  <CTableDataCell>{scheduleItem.nombrefacultad}</CTableDataCell>
                  {cookies.get('rol') === 'administrador' || cookies.get('rol') === 'Superadministrador' ? (<CTableDataCell>
                    
                    <button
                   className="btn btn-primary"
                   title="Actualizar usuario"
                   onClick={() => showModal('actualizar', scheduleItem)}
                 >
                   <CIcon icon={cilPencil} />
                 </button>

                   <button
                     className="btn btn-danger"
                     title="Eliminar usuario"
                     onClick={() => eliminarAsignatura('eliminar', scheduleItem)}
                   >
                     <CIcon icon={cilTrash} />
                   </button></CTableDataCell>): null}

                  

                </CTableRow>
              ))}
            </CTableBody>
          </CTable>) : ''}

        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="ScrollingLongContentExampleLabel"
        >
          <CModalHeader>
            <CModalTitle id="ScrollingLongContentExampleLabel">
              {tipoCrearModificar === 'crear' ? 'Crear asignatura' : 'Actualizar asignatura'}
            </CModalTitle>
          </CModalHeader>
          <CForm autoComplete="off" onSubmit={() => guardar()}>
            <CModalBody>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="codigo_asignatura" className="col-sm-2 col-form-label">
                    Codigo asignatura
                  </CFormLabel>
                </CCol>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    required
                    id="codigo_asignatura"
                    value={codigoAsignatura}
                    onChange={(event) => setCodigoAsignatura(event.target.value)}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="nombre_asignatura" className="col-sm-2 col-form-label">
                    Nombre asignatura
                  </CFormLabel>
                </CCol>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    required
                    id="nombre_asignatura"
                    value={nombreAsignatura}
                    onChange={(event) => setNombreAsignatura(event.target.value)}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={4}>
                  <CFormLabel htmlFor="nombre_asignatura" className="col-sm-2 col-form-label">
                    Facultad
                  </CFormLabel>
                </CCol>
                <CCol sm={8}>
                  <select
                    id="txtProfesor"
                    className="form-control"
                    value={facultad}
                    required
                    onChange={(event) => setFacultad(event.target.value)}
                  >
                    <option value={""}>Ingrese facultad</option>
                    {listFacultades.map((scheduleItem, index) => (
                      <option key={index} value={scheduleItem.id}>
                        {scheduleItem.codigo} {scheduleItem.nombre}
                      </option>
                    ))}
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


      </div>
    </>
  )
}

export default AppAsignatura
