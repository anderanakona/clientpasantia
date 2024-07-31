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

const _nav2 = [
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
]

export default _nav2
