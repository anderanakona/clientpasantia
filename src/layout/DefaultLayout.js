import React, { useState, useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  useEffect(() => {
   if (cookies.get('contrasena') == null && cookies.get('nombre_usuario') == null) {
      navigate('/login')
    }
  })

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
