import axios from 'axios'
import Cookies from 'universal-cookie'


//let baseUrl = window.BASE_URL
//let key = process.env.REACT_APP_KEY

const cookies = new Cookies()


export const authLogin = async (nombre_usuario, contrasena, props) => {
  try {
    const { data } = await axios({
      url: 'http://localhost:4000/api/usuario/login',
      method: 'POST',
      data: {
        nombre_usuario: nombre_usuario,
        contrasena: contrasena,
      },
    })
    if (data.error === false && data.status === 200) {
      cookies.set('nombre_usuario', data.body.data.nombre_usuario, { path: '/' })
      cookies.set('email', data.body.data.email, { path: '/' })
      cookies.set('contrasena', data.body.data.contrasena, { path: '/' })
      cookies.set('rol', data.body.data.rol, { path: '/' })
      cookies.set('id_rol', data.body.data.rol, { path: '/' })

    }else{
      alert("error")
    }

    //return data
  } catch (error) {
    console.log(error.message);
    alert("Usuario y/o contraseña incorrectas");
  }
}
