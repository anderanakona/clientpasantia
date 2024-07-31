import axios from 'axios'

/**
 * @name getHorarioSalon
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
export const getHorarioSalon = async (codigo) => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/horarioClases/' + codigo,
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}


/**
 * @name getHorarioSalon
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
export const getHorarioSalonSabado = async (codigo) => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/horarioClases/sabado/' + codigo+'/sabado',
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}

/**
 * @name getHorarioSalon
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
export const obtenerHorarioSalonId = async (codigo, idHora) => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/horarioClases/' + codigo + '/' + idHora,
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}
export const createHorario = async (horario) => {
  try {
    const { data } = await axios({
      url: 'http://localhost:4000/api/horarioClases',
      method: 'POST',
      data: horario,
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const eliminarHorarioBD = async (horario) => {
  try {
    const { data } = await axios({
      url: 'http://localhost:4000/api/horarioClases',
      method: 'PUT',
      data: horario,
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error.message)
  }
}

/**
 * @name obtenerHorarioDetalle
 * @description Petición Get para obtener el listado de planos para cargar
 * /:idHora/:idDiaSemana/:idSalon
 * @returns response
 */
export const obtenerHorarioDetalle = async (idHora, idDiaSemana, idSalon) => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/horarioClases/' + idHora + '/' + idDiaSemana + '/'+idSalon,
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}

/**
 * @name obtenerHorarioDetalle
 * @description Petición Get para obtener el listado de planos para cargar
 * /:idHora/:idDiaSemana/:idSalon
 * @returns response
 */
export const obtenerHorarioParaColores = async (porcentaje, idDiaSemana) => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/horarioClases/colores/' + porcentaje + '/' + idDiaSemana,
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}



