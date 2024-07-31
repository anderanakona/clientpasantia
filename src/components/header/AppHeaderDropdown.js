import React, { useState, useEffect } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import Cookies from "universal-cookie";
import { Link, useNavigate} from 'react-router-dom'



const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {});
  const cerrarSesion = () => {
    cookies.remove("id_rol", { path: "/" });
    cookies.remove("rol", { path: "/" });
    cookies.remove("contrasena", { path: "/" });
    cookies.remove("nombre_usuario", { path: "/" });
    cookies.remove("email", { path: "/" });
    navigate('/login'); 
  };
  return (
    <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>      
     {/*  <CAvatar src={avatar8} size="md" /> */}
      <CIcon icon={cilUser} className="me-2" />
    </CDropdownToggle>
    <CDropdownMenu className="pt-0" placement="bottom-end">
      <CDropdownHeader className="bg-light fw-semibold py-2">
        {cookies.get("nombre_usuario")}
      </CDropdownHeader>
     
      <CDropdownItem href="#">
        <CIcon icon={cilUser} className="me-2" />
        Perfil
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon icon={cilSettings} className="me-2" />
        Opciones
      </CDropdownItem>

      <CDropdownDivider />
      <CDropdownItem  onClick={() => cerrarSesion()}>
        <CIcon icon={cilLockLocked} className="me-2" />
        Salir
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
  )
}

export default AppHeaderDropdown
