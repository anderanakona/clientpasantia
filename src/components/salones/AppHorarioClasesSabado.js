import React, { useEffect, useState } from 'react'
import { getAllAsignatura } from '../../api/AsignaturaService'
import { getAllProfesor } from '../../api/ProfesorService'
import {
  createHorario,
  obtenerHorarioSalonId, obtenerHorarioDetalle,
  eliminarHorarioBD
} from '../../api/HorarioClasesService'
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
  CForm,
  CFormSelect,
  CTooltip,
} from '@coreui/react'

/* REACTJS-REDUX */
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
//para la alerta
import Swal from 'sweetalert2'

const AppHorarioClasesSabado = () => {
  const dataHorario = useSelector((state) => state.salonReducer.horarioSalonDataSabado)
  const data = useSelector((state) => state.salonReducer.infoSalonesData)
  const [visible, setVisible] = useState(false)
  const [listProfesores, setListProfesores] = useState([])
  const [listAsignaturas, setListAsignaturas] = useState([])
  const [listHorario, setListHorario] = useState([])

  const dispatch = useDispatch()

  const [idHora, setIdHora] = useState(0)
  const [idDiaSemana, setIdDiaSemana] = useState(0)
  const [asignatura, setAsignatura] = useState('')
  const [profesor, setProfesor] = useState('')
  const [horario, setHorario] = useState({})
  const [horario2, setHorario2] = useState({})
  const [horaInicioHoraFin, setHoraInicioHoraFin] = useState("")

  const [dia, setDia] = useState('')
  const [idHorario, setIdHorario] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const dataLi = await getAllProfesor()
      setListProfesores(dataLi.data.body)
      const dataListaAsigna = await getAllAsignatura()
      setListAsignaturas(dataListaAsigna.data.body)
      setListHorario(dataHorario)
    }
    fetchData()
  }, []) // Solo se ejecuta cuando 'count' cambia

  ///:idHora/:idDiaSemana/:idSalon
  const handleOpenModal = async (scheduleItem, day, idDia, materia1, profesor1, horafininicio, id) => {
    setIdHorario(id)
    setHorario(scheduleItem)
    setHoraInicioHoraFin(horafininicio)
    if (id === null || id === undefined) {

      const detalleHorario = await obtenerHorarioDetalle(scheduleItem.id, idDia, data.id)
      if (detalleHorario.data.body[0] != null || detalleHorario.data.body[0] != undefined) {
        setIdHorario(detalleHorario.data.body[0].id)
        setHorario(detalleHorario.data.body[0])
        setProfesor(profesor1)
        setAsignatura(materia1)
      }

    }
    setVisible(true)
    setDia(day)
    setIdHora(scheduleItem.id)
    setIdDiaSemana(idDia);
    if (profesor1 == null || profesor1 === undefined || profesor1 == '') {
      profesor1 = "";
    }
    if (materia1 == null || materia1 === undefined || materia1 == '') {
      materia1 = "";
    }
    setAsignatura(materia1);
    setProfesor(profesor1);

  }

  const handleCloseModal = () => {
    setVisible(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log('Form Data Submitted:', formData)
    guardarHorario()
    
  }
  // Función para actualizar un horario específico por su ID
  const actualizarHorario = (id) => {

    // Creamos una copia del array original usando map para encontrar y actualizar el horario por su ID
    const horariosActualizados = listHorario.map((horarioset) => {
      if (horarioset.id === id) {
        //console.log(obj.data.body[0])
        // Modificamos solo el horario que coincide con el ID
        if (dia === 'Sabado') {

          return {
            ...horarioset,
            asignatura_sabado: asignatura,
            profesor_sabado: profesor,
            id_horario_sabado: horario2.id_horario_sabado,
          }
        }
      }
      return horarioset // Devolvemos el horario sin cambios si no es el que buscamos
    })


    // Actualizamos el estado con el array de horarios actualizados
    return horariosActualizados
  }


  const quitarSegundos = (horaConSegundos) => {    // Separar la hora y minutos
    var horaMinutos = horaConSegundos.split(':').slice(0, 2).join(':');
    return horaMinutos;
  }
  const formatearHora = (horaConSegundos) => {

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

  const eliminarHorario=async()=>{
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
        try {
          const formulario = {
            id: idHorario,
            id_asignatura: 0,
          }
          const formu = await eliminarHorarioBD(formulario)
          console.log(formu)
          if (formu.error===false) {
            //setListHorario(dataHorarioSalon.data.body)
            const obj = await obtenerHorarioSalonId(data.codigo_salon, idHora)
            setHorario2(obj.data.body[0])
            setListHorario(eliminarHorarioTabla(idHora))
            setListHorario(eliminarHorarioTabla(idHora))           
            setProfesor("")
            setAsignatura("")           
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El registro ha sido eliminado.',
              icon: 'success',
            })
          }
        } catch (error) {
          console.log(error)
        }
        setIdHorario(0)
        setVisible(false)

        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Tu registro esta seguro :)',
          icon: 'error',
        })
      }
    })
    
  }

  const eliminarHorarioTabla = (id) => {

    // Creamos una copia del array original usando map para encontrar y actualizar el horario por su ID
    const horariosActualizados = listHorario.map((horarioset) => {
      if (horarioset.id === id) {
        //console.log(obj.data.body[0])
        // Modificamos solo el horario que coincide con el ID
        if (dia === 'Sabado') {

          return {
            ...horarioset,
            asignatura_sabado: '',
            profesor_sabado: '',
            id_horario_sabado: 0,
          }
        }
      }
      return horarioset // Devolvemos el horario sin cambios si no es el que buscamos
    })


    // Actualizamos el estado con el array de horarios actualizados
    return horariosActualizados
  }

  const guardarHorario = async () => {
   

    await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardarlo!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const formulario = {
            id: idHorario,
            id_hora: idHora,
            id_dia_semana: idDiaSemana,
            asignatura: asignatura,
            profesor: profesor,
            id_salon: data.id,
            id_asignatura: 0,
          }
          const formu = await createHorario(formulario)
          //console.log(formu)
          if (formu.error===false) {
            //setListHorario(dataHorarioSalon.data.body)
            const obj = await obtenerHorarioSalonId(data.codigo_salon, idHora)
            setHorario2(obj.data.body[0])
            setListHorario(actualizarHorario(idHora))
            setListHorario(actualizarHorario(idHora))
            Swal.fire({
              title: 'Cancelado',
              text: 'Tu registro ha sido guardado correctamente :)',
              icon: 'success',
            })
            setProfesor("")
            setAsignatura("")
          }
        } catch (error) {
          console.log(error)
        }
        setIdHorario(0)
        setVisible(false)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'puedes seguir  editando :)',
          icon: 'error',
        })
      }
    })

  }





  const handleIdHoraChange = (event) => {
    setIdHora(event.target.value)
  }

  const handleIdDiaSemanaChange = (event) => {
    setIdDiaSemana(event.target.value)
  }

  const handleAsignaturaChange = (event) => {
    setAsignatura(event.target.value)
  }

  const handleProfesorChange = (event) => {
    setProfesor(event.target.value)
  }

  return (
    <>
      <h1>
        {' '}
        {data.nombresalon} {' SEDE  '} {data.ubicacion} {'  '}
        {'CAPACIDAD '}
        {data.capacidadsalon}
      </h1>
      <CTable align="middle" className="mb-0 border" bordered borderColor="primary" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell scope="col">Hora</CTableHeaderCell>
            <CTableHeaderCell scope="col">Sabado</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {listHorario.map((scheduleItem, index) => (
            <CTableRow key={index}>
              <CTableDataCell>
                {formatearHora(scheduleItem.hora_inicio)}-{formatearHora(scheduleItem.hora_fin)}{' '}
              </CTableDataCell>
              <CTableDataCell
                onClick={() =>
                  handleOpenModal(
                    scheduleItem,
                    'Sabado',
                    6,
                    scheduleItem.asignatura_sabado,
                    scheduleItem.profesor_sabado,
                    formatearHora(scheduleItem.hora_inicio) + '-' + formatearHora(scheduleItem.hora_fin),
                    scheduleItem.id_horario_sabado,
                  )
                }
              >
                {scheduleItem.asignatura_sabado}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CModal visible={visible} onClose={handleCloseModal}>
        <CModalHeader>
        {idHorario != 0 && idHorario!=undefined && idHorario!=null ? (<CRow>
            <CCol sm={11}></CCol>
            <CCol sm={1}>
              <CTooltip content="Eliminar">
                <button
                  className="btn btn-danger"
                  title="Eliminar usuario"
                  onClick={() => eliminarHorario()}
                >
                  <CIcon icon={cilTrash} />
                </button>
              </CTooltip>
            </CCol>
          </CRow>) : ''}

          
          <CModalTitle>{data.nombresalon}</CModalTitle>
        </CModalHeader>
        <form onSubmit={handleSubmit}>
          <CModalBody>
            <div className="form-group row">
              <label htmlFor="txtHora" className="col-sm-2 col-form-label">
                Hora
              </label>
              <input value={idHora} style={{ display: 'none' }} onChange={handleIdHoraChange}></input>
              <div className="col-sm-10">
                <input
                  id="txtHora"
                  className="form-control"
                  disabled={true}
                  value={horaInicioHoraFin}
                />
              </div>
            </div>
            <br></br>
            <input value={idDiaSemana} style={{ display: 'none' }} onChange={handleIdDiaSemanaChange}></input>
            <div className="form-group row">
              <label htmlFor="txtDia" className="col-sm-2 col-form-label">
                Dia
              </label>
              <div className="col-sm-10">
                <input id="txtDia" className="form-control" disabled={true} value={dia} />
              </div>
            </div>
            <br></br>
            <div className="form-group row">
              <label htmlFor="txtProfesor" className="col-sm-2 col-form-label">
                Profesor
              </label>
              <div className="col-sm-10">
                <select
                  id="txtProfesor"
                  className="form-control"
                  value={profesor}
                  required
                  onChange={handleProfesorChange}
                >
                  <option value={""}>Ingrese profesor</option>
                  {listProfesores.map((scheduleItem, index) => (
                    <option key={index} value={scheduleItem.nombre + '||' + scheduleItem.codigo_profesor}>
                      {scheduleItem.nombre + '||' + scheduleItem.codigo_profesor}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br></br>
            <div className="form-group row">
              <label htmlFor="txtAsignatura" className="col-sm-2 col-form-label">
                Asignatura
              </label>
              <div className="col-sm-10">
                <select
                  id="txtAsignatura"
                  className="form-control"
                  value={asignatura}
                  required
                  onChange={handleAsignaturaChange}
                >
                  <option value={""}>Ingrese Asignatura</option>
                  {listAsignaturas.map((scheduleItem, index) => (
                    <option key={index} value={scheduleItem.nombre + "||" + scheduleItem.codigo}>
                      {scheduleItem.nombre + "||" + scheduleItem.codigo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleCloseModal}>
              Cerrar
            </CButton>
            <CButton color="primary" type="submit">
              Guardar cambios
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  )
}
export default AppHorarioClasesSabado
