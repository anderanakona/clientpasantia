import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSettings,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'primerpiso',
        to: '/primerpiso',
      },   
      {
        component: CNavItem,
        name: 'segundopiso',
        to: '/segundopiso',
      },    
    ],
  },
  {
    component: CNavGroup,
    name: 'Configuracion',
    to: '/base',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Asignaturas',
        to: '/asignaturas',
      },
      {
        component: CNavItem,
        name: 'Salones',
        to: '/salon',
      },
      {
        component: CNavItem,
        name: 'Profesores',
        to: '/profesores',
      },
      {
        component: CNavItem,
        name: 'Personas',
        to: '/personas',
      },
      
    ],
  },
]

export default _nav
