import React, { useState, useRef, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import exampleImage from '../../assets/images/sanjoseprimerpiso.jpg'
import './ImageContainer.css' // Si tienes estilos específicos para este componente
import { CAvatar, CBadge,CCardBody, CCard, CCardHeader, CCol, CRow } from '@coreui/react'
import { ModalInfoSalones } from '../modals/ModalInfoSalones'
import { useDispatch } from 'react-redux'
import { typesModal } from '../../actions/modalesAction'
import { typesSalones } from '../../actions/salonAction'
import { getSalon } from '../../api/SalonService'
import { getHorarioSalon, getHorarioSalonSabado, obtenerHorarioParaColores } from '../../api/HorarioClasesService'


const AppSalonPrimerPiso = () => {
  const dispatch = useDispatch()
  //esto para la barra de progreso
  const [progress, setProgress] = useState(0)
  const myElementRef = useRef(null)
  const [ancho, setAncho] = useState(0)

  useEffect(() => {
    // Función para obtener el ancho del componente
    const obtenerAnchoComponente = () => {
      if (myElementRef.current) {
        const width = myElementRef.current.getBoundingClientRect().width
        // console.log("ancho del componente "+width);
        setAncho(width)
      }
    }
    // Llamar a la función al montar el componente
    obtenerAnchoComponente()
  }, [])



  const obtenerDetalleSalones = async (codigo) => {
    dispatch({
      type: typesModal.MODAL_INFO_SALONES,
      modalInfoSalonesShow: true,
    })
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
    
  }

  const obtenerDiaDeHoy=()=> {
    // Crear un nuevo objeto de fecha para hoy
    var today = new Date();
    // Array con los nombres de los días de la semana en español
    var weekdays = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    // Obtener el número del día de la semana (0-6)
    var dayOfWeek = today.getDay();
    // Obtener el nombre del día de la semana usando el array de weekdays
    var dayName = weekdays[dayOfWeek];
    return dayOfWeek;
}

const colocarBotonesVerde=()=>{
  document.getElementById("SJ110").style.backgroundColor='green';
  document.getElementById("SJ111").style.backgroundColor='green';
  document.getElementById("SJ112").style.backgroundColor='green';
  document.getElementById("SJ117").style.backgroundColor='green';

}

const buscarListaPorSalon = (lista,codSalon) => {
  return lista.find(salon => salon.codigo_salon === codSalon) !== undefined;
};
const btn=async(porcentaje)=>{
  colocarBotonesVerde();
  const colores=await obtenerHorarioParaColores(porcentaje,obtenerDiaDeHoy());
 
  if(buscarListaPorSalon(colores.data.body,'SJ110')){
    document.getElementById("SJ110").style.backgroundColor='red';
  }
  if(buscarListaPorSalon(colores.data.body,'SJ111')){
    document.getElementById("SJ111").style.backgroundColor='red';
  }
  if(buscarListaPorSalon(colores.data.body,'SJ112')){
    document.getElementById("SJ112").style.backgroundColor='red';
  }
  if(buscarListaPorSalon(colores.data.body,'SJ117')){
    document.getElementById("SJ117").style.backgroundColor='red';
  }
}


//////*******todo de la barra de progreso */

const handleMouseMove = (event) => {
  // Puedes realizar cualquier acción que necesites aquí
  const clickedPositionX = event.clientX - event.target.offsetLeft // Posición del clic respecto al borde izquierdo de la barra
  //const fullWidth = event.target.offsetWidth; // Ancho total de la barra

  const clickedPercentage = (clickedPositionX / ancho) * 100 // Porcentaje correspondiente al punto donde se hizo clic

  //console.log('Mouse pasó por encima del componente porcentaje ' + clickedPercentage)
}

const handleClick = async(event) => {
  const clickedPositionX = event.clientX - event.target.offsetLeft // Posición del clic respecto al borde izquierdo de la barra
  //const fullWidth = event.target.offsetWidth; // Ancho total de la barra

  let clickedPercentage = 0 // Porcentaje correspondiente al punto donde se hizo clic
  if ((clickedPositionX / ancho) * 100 > 100) {
    clickedPercentage = 100 // Establecer el nuevo progreso
  } else {
    clickedPercentage = (clickedPositionX / ancho) * 100 // Establecer el nuevo progreso
  }
  //clickedPercentage = (clickedPositionX / ancho) * 100
  setProgress(clickedPercentage)
  await btn(clickedPercentage)

}

const handleClick2 = async(event) => {
  const clickedPositionX = event.clientX - event.target.offsetLeft // Posición del clic respecto al borde izquierdo de la barra
  const fullWidth = event.target.offsetWidth // Ancho total de la barra

  let clickedPercentage = 0 // Porcentaje correspondiente al punto donde se hizo clic

  clickedPercentage = (clickedPositionX / fullWidth) * 100

  const arreglo = event.target.id.split('|')

  const hora =  await calcularHora(
    parseInt(arreglo[0], 10),
    parseInt(arreglo[1], 10),
    clickedPercentage,
    arreglo[4],
  )

  const partes =  hora.split(':')

  const horas =  parseInt(partes[0], 10) // Convertir horas a número entero
  const minutos =   parseInt(partes[1], 10) // Convertir minutos a número entero

  const porcentaje = await calcularPorcentajeTiempo( parseInt(7, 10),
  parseInt(0, 10),
  parseInt(22, 10),
  parseInt(10, 10),
  horas,
  minutos);

   setProgress(
    porcentaje
  )

  await btn(porcentaje)
}

const calcularHoraPorcentaje = () => {
  const horaInicialHoras = 7 // Hora inicial: 7 AM
  const horaInicialMinutos = 0 // Minutos inicial: 0

  const horaFinalHoras = 22 // Hora final: 10 PM
  const horaFinalMinutos = 10 // Minutos final: 10

  // Convertir horas a minutos
  const minutosHoraInicial = horaInicialHoras * 60 + horaInicialMinutos
  const minutosHoraFinal = horaFinalHoras * 60 + horaFinalMinutos

  // Calcular duración total del periodo en minutos
  const duracionTotalMinutos = minutosHoraFinal - minutosHoraInicial

  const minutosPorcentaje = (progress / 100) * duracionTotalMinutos

  // Calcular minutos seleccionados desde la hora inicial
  const minutosSeleccionados = minutosHoraInicial + minutosPorcentaje

  // Calcular horas y minutos resultantes
  let horasSeleccionadas = Math.floor(minutosSeleccionados / 60)
  let minutosRestantes = Math.round(minutosSeleccionados % 60)

  // Ajustar horas si es necesario (por ejemplo, si pasa de 24 horas)
  horasSeleccionadas = horasSeleccionadas % 24

  // Formatear la hora seleccionada en formato HH:mm
  const horaFormateada = `${horasSeleccionadas.toString()}:${minutosRestantes.toString()}`
  //setHoraFormato(horaFormateada)
  return horaFormateada
}

const calcularHora = async (horaInicio, minutoInicio, porcentaje, duracionEnMinutos) => {
  // Crear una nueva promesa que se resuelve inmediatamente
  return new Promise((resolve) => {
    // Calcular el porcentaje del tiempo en minutos
    const minutosPorcentaje = (porcentaje / 100) * duracionEnMinutos;

    // Calcular la hora y los minutos resultantes
    const minutosTotales = horaInicio * 60 + minutoInicio + minutosPorcentaje;
    const horasResultantes = Math.floor(minutosTotales / 60);
    const minutosRestantes = Math.round(minutosTotales % 60);

    // Formatear la hora resultante en formato HH:mm
    const horaFormateada = `${horasResultantes.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`;

    // Resolver la promesa con la hora formateada
    resolve(horaFormateada);
  });
};


const calcularPorcentajeTiempo = async (
  horaInicio,
  minutoInicio,
  horaFin,
  minutoFin,
  horaReferencia,
  minutoReferencia
) => {
  // Crear una nueva promesa que se resuelve inmediatamente
  return new Promise((resolve) => {
    // Convertir todos los tiempos a minutos
    const minutosInicio = horaInicio * 60 + minutoInicio;
    const minutosFin = horaFin * 60 + minutoFin;
    const minutosReferencia = horaReferencia * 60 + minutoReferencia;

    // Calcular la duración total del periodo en minutos
    const duracionTotal = minutosFin - minutosInicio;

    // Calcular el tiempo transcurrido desde la hora de inicio hasta la referencia
    const tiempoTranscurrido = minutosReferencia - minutosInicio;

    // Calcular el porcentaje del tiempo transcurrido respecto al total
    const porcentaje = (tiempoTranscurrido / duracionTotal) * 100;

    // Redondear a dos decimales y resolver la promesa
    resolve(porcentaje.toFixed(2));
  });
};


/***Termina todo lo de la barra de progreso */

  return (
    <>
      <div className="image-container">
        <img src={exampleImage} alt="Descripción de la imagen" className="image" />
        <div
          className="etiqueta"
          title='Salón 110'
          style={{ top: '25.5%', left: '19.3%',backgroundColor:'green', width: '75px', height: '35px' }}
          onClick={() => obtenerDetalleSalones('SJ110')}
          id='SJ110'
        ></div>
        <div
          className="etiqueta"
          style={{ top: '34%', left: '12.6%' ,width: '29px', height: '65px',backgroundColor:'green',}}
          onClick={() => obtenerDetalleSalones('SJ111')}
          title='Salón 111'
          id='SJ111'
        ></div>
        <div
          className="etiqueta"
          style={{ top: '40.5%', left: '12.3%',backgroundColor:'green',width: '27px', height: '27px' }}
          onClick={() => obtenerDetalleSalones('SJ112')}
          title='Salón 112'
          id='SJ112'
        ></div>
        <div
          className="etiqueta"
          style={{ top: '44.8%', left: '12.3%',backgroundColor:'green',width: '27px', height: '27px' }}
          onClick={() => obtenerDetalleSalones('SJ117')}
          title='Salón 117'
          id='SJ117'
        ></div>

        <CAvatar
          color="primary"
          textColor="white"
          className="etiquetapeque"
          style={{ top: '50.8%', left: '20.3%', width: '25px', height: '25px',    borderRadius: '0', // Eliminamos el borde redondeado
          }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiquetapeque"
          style={{ top: '50.8%', left: '27.3%', width: '25px', height: '25px' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '52%', left: '12.3%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '58%', left: '12.1%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '65%', left: '11.9%' }}
        ></CAvatar>

        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '71%', left: '11.9%' }}
        ></CAvatar>

        <CAvatar
          title="calle 5"
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '82%', left: '11.9%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '82%', left: '18.5%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '82%', left: '25%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '82%', left: '29.2%', fontSize: '8px' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiquetapeque"
          style={{ top: '82%', left: '32.2%', width: '25px', height: '25px' }}
        ></CAvatar>

        <CAvatar
          color="primary"
          textColor="white"
          className="etiquetapeque"
          style={{ top: '82%', left: '35.5%', width: '25px', height: '25px' }}
        ></CAvatar>
      </div>
      <ModalInfoSalones></ModalInfoSalones>

      <div className="app" ref={myElementRef} onMouseMove={handleMouseMove}>
        <ProgressBar percentage={progress} handleClick={handleClick} />
      </div>
      <div className="progress">
        <div
          className="progress-bar-striped bg-info"
          role="progressbar"
          id="7|0|8|0|60"
          style={{ color: 'white', width: '6.60%', fontSize: '9px' }}
          aria-valuenow="15"
          aria-valuemin="0"
          aria-valuemax="100"
          onClick={handleClick2}
        >
          7:00AM-8:00AM
        </div>
        <div
          className="progress-bar-striped bg-warning"
          role="progressbar"
          style={{ color: 'white', width: '6.60%', fontSize: '9px' }}
          aria-valuenow="30"
          aria-valuemin="0"
          aria-valuemax="100"
          id="8|0|9|0|60"
          onClick={handleClick2}
        >
          8:00AM-9:00AM
        </div>
        <div
          className="progress-bar-striped bg-danger"
          role="progressbar"
          style={{ color: 'white', width: '6.60%', fontSize: '8px' }}
          aria-valuenow="20"
          aria-valuemin="0"
          id="9|0|10|0|60"
          onClick={handleClick2}
          aria-valuemax="100"
        >
          9:00AM-10:00AM
        </div>
        <div
          className="progress-bar-striped bg-success"
          role="progressbar"
          style={{ color: 'white', width: '6.60%', fontSize: '8px' }}
          aria-valuenow="15"
          aria-valuemin="0"
          id="10|0|11|0|60"
          onClick={handleClick2}
          aria-valuemax="100"
        >
          10:00AM-11:00AM
        </div>
        <div
          className="progress-bar-striped bg-info"
          role="progressbar"
          style={{ color: 'white', width: '6.60%', fontSize: '8px' }}
          aria-valuenow="15"
          aria-valuemin="0"
          id="11|0|12|0|60"
          onClick={handleClick2}
          aria-valuemax="100"
        >
          11:00AM-12:00PM
        </div>
        <div
          className="progress-bar-striped bg-warning"
          role="progressbar"
          style={{ color: 'white', width: '6.60%', fontSize: '9px' }}
          aria-valuenow="30"
          aria-valuemin="0"
          aria-valuemax="100"
          onClick={handleClick2}
          id="12|0|13|0|60"
        >
          12:00PM-1:00PM
        </div>
        <div
          className="progress-bar-striped bg-danger"
          role="progressbar"
          style={{ color: 'white', width: '6.60%', fontSize: '9px' }}
          aria-valuenow="20"
          aria-valuemin="0"
          id="13|0|14|0|60"
          onClick={handleClick2}
          aria-valuemax="100"
        >
          1:00PM-2:00PM
        </div>
        <div
          className="progress-bar-striped bg-success"
          role="progressbar"
          style={{ color: 'white', width: '6.60%', fontSize: '9px' }}
          aria-valuenow="15"
          aria-valuemin="0"
          id="14|0|15|0|60"
          onClick={handleClick2}
          aria-valuemax="100"
        >
          2:00PM-3:00PM
        </div>
        <div
          className="progress-bar-striped bg-info"
          role="progressbar"
          style={{ color: 'white', width: '6.60%', fontSize: '9px' }}
          aria-valuenow="15"
          aria-valuemin="0"
          aria-valuemax="100"
          onClick={handleClick2}
          id="15|0|16|0|60"
        >
          3:00PM-4:00PM
        </div>
        <div
          className="progress-bar-striped bg-warning"
          role="progressbar"
          style={{ color: 'white', width: '6.60%', fontSize: '9px' }}
          aria-valuenow="30"
          aria-valuemin="0"
          aria-valuemax="100"
          onClick={handleClick2}
          id="16|0|17|0|60"
        >
          4:00PM-5:00PM
        </div>
        <div
          className="progress-bar-striped bg-danger"
          role="progressbar"
          style={{ color: 'white', width: '6.60%', fontSize: '9px' }}
          aria-valuenow="20"
          aria-valuemin="0"
          aria-valuemax="100"
          onClick={handleClick2}
          id="17|0|18|0|60"
        >
          5:00PM-6:00PM
        </div>
        <div
          className="progress-bar-striped bg-success"
          role="progressbar"
          style={{ color: 'white', width: '5.49%', fontSize: '8px' }}
          aria-valuenow="15"
          aria-valuemin="0"
          onClick={handleClick2}
          aria-valuemax="100"
          id="18|0|18|50|50"
        >
          6:00PM-6:50PM
        </div>
        <div
          className="progress-bar-striped bg-info"
          role="progressbar"
          style={{ color: 'white', width: '5.49%', fontSize: '8px' }}
          aria-valuenow="15"
          aria-valuemin="0"
          onClick={handleClick2}
          id="18|50|19|40|50"
          aria-valuemax="100"
        >
          6:50PM-7:40PM
        </div>
        <div
          className="progress-bar-striped bg-warning"
          role="progressbar"
          style={{ color: 'white', width: '5.49%', fontSize: '8px' }}
          aria-valuenow="30"
          aria-valuemin="0"
          onClick={handleClick2}
          id="19|40|20|30|50"
          aria-valuemax="100"
        >
          7:40PM-8:30PM
        </div>
        <div
          className="progress-bar-striped bg-danger"
          role="progressbar"
          style={{ color: 'white', width: '5.49%', fontSize: '8px' }}
          aria-valuenow="20"
          aria-valuemin="0"
          id="20|30|21|20|50"
          onClick={handleClick2}
          aria-valuemax="100"
        >
          8:30PM-9:20PM
        </div>
        <div
          className="progress-bar-striped bg-success"
          role="progressbar"
          style={{ color: 'white', width: '5.49%', fontSize: '7px' }}
          aria-valuenow="15"
          aria-valuemin="0"
          aria-valuemax="100"
          id="21|20|20|10|50"
          onClick={handleClick2}
        >
          9:20PM-10:10PM
        </div>
      </div>




    </>
  )
}

export default AppSalonPrimerPiso
