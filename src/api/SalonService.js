import axios from 'axios'

/**
 * @name getSalon
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
export const getAllSalon = async () => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/salon/',
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}


/**
 * @name getSalon
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
export const getSalon = async (codigo) => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/salon/saloncodigo/' + codigo,
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}