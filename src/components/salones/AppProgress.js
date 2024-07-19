import React, { useState, useRef, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import './ImageContainer.css' // Si tienes estilos específicos para este componente
const AppProgress = () => {
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
      calcularHoraPorcentaje()
    }

    // Llamar a la función al montar el componente
    obtenerAnchoComponente()
  }, [])

  const handleMouseMove = (event) => {
    // Puedes realizar cualquier acción que necesites aquí
    const clickedPositionX = event.clientX - event.target.offsetLeft // Posición del clic respecto al borde izquierdo de la barra
    //const fullWidth = event.target.offsetWidth; // Ancho total de la barra

    const clickedPercentage = (clickedPositionX / ancho) * 100 // Porcentaje correspondiente al punto donde se hizo clic

    //console.log('Mouse pasó por encima del componente porcentaje ' + clickedPercentage)
  }

  const handleClick = (event) => {
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
  }

  const handleClick2 = (event) => {
    const clickedPositionX = event.clientX - event.target.offsetLeft // Posición del clic respecto al borde izquierdo de la barra
    const fullWidth = event.target.offsetWidth // Ancho total de la barra

    let clickedPercentage = 0 // Porcentaje correspondiente al punto donde se hizo clic

    clickedPercentage = (clickedPositionX / fullWidth) * 100

    const arreglo = event.target.id.split('|')

    const hora = calcularHora(
      parseInt(arreglo[0], 10),
      parseInt(arreglo[1], 10),
      clickedPercentage,
      arreglo[4],
    )
    // Dividir la cadena en horas y minutos usando ':' como delimitador
    const partes = hora.split(':')

    const horas = parseInt(partes[0], 10) // Convertir horas a número entero
    const minutos = parseInt(partes[1], 10) // Convertir minutos a número entero
    setProgress(
      calcularPorcentajeTiempo(
        parseInt(7, 10),
        parseInt(0, 10),
        parseInt(22, 10),
        parseInt(10, 10),
        horas,
        minutos,
      )
    )
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

  const calcularHora = (horaInicio, minutoInicio, porcentaje, duracionEnMinutos) => {
    // Calcular el porcentaje del tiempo en minutos
    let minutosPorcentaje = (porcentaje / 100) * duracionEnMinutos

    // Calcular la hora y los minutos resultantes
    let minutosTotales = horaInicio * 60 + minutoInicio + minutosPorcentaje
    let horasResultantes = Math.floor(minutosTotales / 60)
    let minutosRestantes = Math.round(minutosTotales % 60)

    // Formatear la hora resultante en formato HH:mm
    let horaFormateada = `${horasResultantes.toString().padStart(2, '0')}:${minutosRestantes
      .toString()
      .padStart(2, '0')}`

    return horaFormateada
  }

  const calcularPorcentajeTiempo = (
    horaInicio,
    minutoInicio,
    horaFin,
    minutoFin,
    horaReferencia,
    minutoReferencia,
  ) => {
    // Convertir todos los tiempos a minutos
    const minutosInicio = horaInicio * 60 + minutoInicio
    const minutosFin = horaFin * 60 + minutoFin
    const minutosReferencia = horaReferencia * 60 + minutoReferencia

    // Calcular la duración total del periodo en minutos
    const duracionTotal = minutosFin - minutosInicio

    // Calcular el tiempo transcurrido desde la hora de inicio hasta la referencia
    const tiempoTranscurrido = minutosReferencia - minutosInicio

    // Calcular el porcentaje del tiempo transcurrido respecto al total
    const porcentaje = (tiempoTranscurrido / duracionTotal) * 100

    return porcentaje.toFixed(2) // Redondear a dos decimales
  }

  return (
    <>
      La hora seleccionada {calcularHoraPorcentaje()} porcentaje grandre {progress} porcentaje
      pequeño
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
          style={{ color: 'white', width: '6.60%', fontSize: '9px' }}
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

export default AppProgress
