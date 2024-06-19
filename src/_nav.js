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
        name: 'Asignatura',
        to: '/asignatura',
      },
      {
        component: CNavItem,
        name: 'Salones',
        to: '/salon',
      },
      
    ],
  },
  {
    component: CNavItem,
    name: 'Cards',
    to: '/base/cards',
  },
]

export default _nav
