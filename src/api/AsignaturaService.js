import axios from 'axios'

/**  id 	id_hora 	id_dia_semana 	asignatura 	profesor 	id_salon 	id_asignatura
 * @name getAllAsignatura
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
export const getAllAsignatura = async () => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/asignatura/',
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}