import axios from 'axios'

/**
 * @name getAllProfesor
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
export const getAllProfesor = async () => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/profesor/',
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}