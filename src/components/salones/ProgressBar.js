import React from 'react'
import './ProgressBar.css' // Archivo CSS para estilizar la barra de progreso
import { CProgress, CProgressBar, CProgressStacked } from '@coreui/react'

const ProgressBar = (props) => {
  const { percentage, handleClick } = props

  return (
    <>
      <div className="progress-bar" onClick={handleClick}>
        <div className="progress" style={{ width: `${percentage}%` }}></div>       
      </div>
    </>
  )
}

export default ProgressBar
