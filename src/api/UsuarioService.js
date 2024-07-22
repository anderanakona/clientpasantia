import axios from 'axios'

/**
 * @name getAllRol
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
export const getAllRol= async (idPersona) => {
    try {
      const response = await axios({
        url: 'http://localhost:4000/api/usuario/roles/'+idPersona,
        method: 'GET',
      })
      return response
    } catch (error) {
      return false
    }
  }

  /**
 * @name agregarUsuario
 * @description Petición Get para obtener el listado de planos para cargar
 * @returns response
 */
  export const agregarUsuario = async (usuario) => {
    try {
      const { data } = await axios({
        url: 'http://localhost:4000/api/usuario/',
        method: 'POST',
        data: usuario,
      })
      return data
    } catch (error) {
      console.log(error.message)
    }
  }