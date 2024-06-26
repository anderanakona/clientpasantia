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
