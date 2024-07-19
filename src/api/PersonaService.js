import axios from 'axios'

/**
 * @name getAllProfesor
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
export const getAllPersonas= async () => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/persona/',
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}

export const createPersona = async (persona) => {
    try {
      const { data } = await axios({
        url: 'http://localhost:4000/api/persona',
        method: 'POST',
        data: persona,
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
export const obtenerPersonaNumTipo = async (numId, codTipoId) => {
    try {
      const response = await axios({
        url: 'http://localhost:4000/api/persona/' + numId + '/' + codTipoId,
        method: 'GET',
      })
      return response
    } catch (error) {
      return false
    }
  }