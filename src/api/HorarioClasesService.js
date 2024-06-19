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
