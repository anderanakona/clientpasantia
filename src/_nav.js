import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilBook,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilEducation,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilRoom,
  cilSettings,
  cilSpeedometer,
  cilStar,
  cilVerticalAlignBottom,
  cilVerticalAlignTop,
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
        icon: <CIcon icon={cilVerticalAlignBottom} customClassName="nav-icon" />,        
      },   
      {
        component: CNavItem,
        name: 'segundopiso',
        to: '/segundopiso',
        icon: <CIcon icon={cilVerticalAlignTop} customClassName="nav-icon" />,        
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
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        to: '/asignaturas',
      },
      {
        component: CNavItem,
        name: 'Salones',
        icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,        
        to: '/salon',
      },
      {
        component: CNavItem,
        name: 'Profesores',
        icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,    
        to: '/profesores',
      },
      {
        component: CNavItem,
        name: 'Personas',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,            
        to: '/personas',
      },
      
    ],
  },
]

export default _nav
