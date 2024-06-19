import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
  CCardImage,
  CCardFooter,
  CSidebarBrand,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Cookies from 'universal-cookie'
import { authLogin } from '../../../api/auth/AuthService'

function Login(props) {
  const [form, setForm] = useState({})
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  const cookies = new Cookies()
  useEffect(() => {
    if (cookies.get('contrasena') != null && cookies.get('nombre_usuario') != null) {
      navigatetodashboard()
    }
  })
  const handleSubmit = (e) => {
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
    } else {
      ingresarLogin()
    }
    setValidated(true)
    e.preventDefault()
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const navigatetodashboard = () => {
    navigate('/')
  }
  const ingresarLogin = async() => {
    try {
     await authLogin(form.username, form.password, props)
      if (cookies.get('contrasena') != null && cookies.get('nombre_usuario') != null) {
        navigatetodashboard()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    className="needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <h1>Iniciar Sesión</h1>
                    {/*
                      <p className="text-medium-emphasis">Ingrese a su cuenta</p>
                     
                      
                      */}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Usuario"
                        name="username"
                        onChange={handleChange}
                        required
                      />
                      <CFormFeedback invalid>El campo es requerido.</CFormFeedback>
                    </CInputGroup>
                    <br></br>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        onChange={handleChange}
                        required
                      />
                      <CFormFeedback invalid>El campo es requerido.</CFormFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Ingresar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/* 
                         <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                        */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <div>
                  <CSidebarBrand
                    className="d-none d-md-flex"
                    style={{
                      background: 'white',
                      border: '1px solid #d8dbe0',
                      borderTop: '10px solid white',
                      borderBottom: '10px solid white',
                      marginTop: '14%',
                      marginLeft: '0.2%',
                    }}
                    to="/"
                  ></CSidebarBrand>
                </div>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
