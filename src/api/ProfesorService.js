import { data } from 'autoprefixer'
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

export const agregarProfesor = async (profesor) => {
  try {
    const { data } = await axios({
      url: 'http://localhost:4000/api/profesor/',
      method: 'POST',
      data: profesor,
    })
    console.log(profesor)
    return data
  } catch (error) {
    console.log(profesor)
    console.log(error.message)
  }
}
export const obtenerProfesorCodigo = async (codigo) => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/profesor/codigoProfesor/'+codigo,
      method: 'GET',
    })
    
    return response
  } catch (error) {
    return false
  }
}

export const obtenerProfesorPersona = async (idPersona) => {
  try {
    const response = await axios({
      url: 'http://localhost:4000/api/profesor/idPersona/'+idPersona,
      method: 'GET',
    })
    return response
  } catch (error) {
    return false
  }
}








