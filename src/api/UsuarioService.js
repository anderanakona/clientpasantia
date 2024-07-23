import axios from 'axios'

/**
 * @name getAllRol
 * @description Petición Get 
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

  export const imprimirRol= async () => {
    try {
      const response = await axios({
        url: 'http://localhost:4000/api/usuario/todos/rol/all',
        method: 'GET',
      })
      return response
    } catch (error) {
      return false
    }
  }

  export const getAllRolIdPersona= async (idPersona) => {
    try {
      const response = await axios({
        url: 'http://localhost:4000/api/usuario/rol/'+idPersona,
        method: 'GET',
      })
      return response
    } catch (error) {
      return false
    }
  }

  /**
 * @name agregarUsuario
 * @description Petición Get para obtene
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
      console.log(usuario)
    }
  }

  export const eliminarUsuario = async (usuario) => {
    try {
      const { data } = await axios({
        url: 'http://localhost:4000/api/usuario/',
        method: 'PUT',
        data: usuario,
      })
      return data
    } catch (error) {
      console.log(error.message)
      console.log(usuario)
    }
  }


  export const buscarusuarioUnico= async (nombreUsuario) => {
    try {
      const response = await axios({
        url: 'http://localhost:4000/api/usuario/buscarusuario/'+nombreUsuario,
        method: 'GET',
      })
      return response
    } catch (error) {
      return false
    }
  }
  