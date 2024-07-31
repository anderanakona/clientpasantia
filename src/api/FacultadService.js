import axios from 'axios'

/**  
 * @name getAllFacultad
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
export const getAllFacultad = async () => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/facultad/',
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}