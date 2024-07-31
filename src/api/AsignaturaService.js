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

export const obtenerAsignaturaCodigo = async (codigo) => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/asignatura/'+codigo,
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}



export const agregarAsignatura = async (asignatura) => {
  try {
    const { data } = await axios({
      url: 'http://localhost:4000/api/asignatura/',
      method: 'POST',
      data: asignatura,
    })
    return data
  } catch (error) {
    console.log(error.message)
  }
}
export const eliminarAsignaturaREST = async (asignatura) => {
  try {
    const { data } = await axios({
      url: 'http://localhost:4000/api/asignatura/',
      method: 'PUT',
      data: asignatura,
    })
    return data
  } catch (error) {
    console.log(error.message)
  }
}

