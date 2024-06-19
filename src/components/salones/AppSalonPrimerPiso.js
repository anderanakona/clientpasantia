import React from 'react'
import exampleImage from '../../assets/images/sanjose1.jpg'
import './ImageContainer.css' // Si tienes estilos específicos para este componente
import { CAvatar, CBadge } from '@coreui/react'
import { ModalInfoSalones } from '../modals/ModalInfoSalones'
import { useDispatch } from 'react-redux'
import { typesModal } from '../../actions/modalesAction'
import { typesSalones } from '../../actions/salonAction'
import { getSalon } from '../../api/SalonService'
import { getHorarioSalon } from '../../api/HorarioClasesService'


const AppSalonPrimerPiso = () => {
  const dispatch = useDispatch()

  const obtenerDetalleSalones = async (codigo) => {
    dispatch({
      type: typesModal.MODAL_INFO_SALONES,
      modalInfoSalonesShow: true,
    })
    const data = await getSalon(codigo)
    dispatch({
      type: typesSalones.INFO_SALON,
      infoSalonesData: data.data.body[0],
    })
    const dataHorarioSalon = await getHorarioSalon(codigo)

    dispatch({
      type: typesSalones.INFO_SALON,
      horarioSalonData: dataHorarioSalon.data.body,
    })
    
  }

  return (
    <>
      <div className="image-container">
        <img src={exampleImage} alt="Descripción de la imagen" className="image" />
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '25%', left: '19%' }}
          onClick={() => obtenerDetalleSalones('SJ110')}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '35%', left: '12.6%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '40.5%', left: '12.3%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '44.8%', left: '12.3%' }}
        ></CAvatar>

        <CAvatar
          color="primary"
          textColor="white"
          className="etiquetapeque"
          style={{ top: '50.8%', left: '20.3%', width: '25px', height: '25px' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiquetapeque"
          style={{ top: '50.8%', left: '27.3%', width: '25px', height: '25px' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '52%', left: '12.3%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '58%', left: '12.1%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '65%', left: '11.9%' }}
        ></CAvatar>

        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '71%', left: '11.9%' }}
        ></CAvatar>

        <CAvatar
          title="calle 5"
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '82%', left: '11.9%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '82%', left: '18.5%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '82%', left: '25%' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiqueta"
          style={{ top: '82%', left: '29.2%', fontSize: '8px' }}
        ></CAvatar>
        <CAvatar
          color="primary"
          textColor="white"
          className="etiquetapeque"
          style={{ top: '82%', left: '32.2%', width: '25px', height: '25px' }}
        ></CAvatar>

        <CAvatar
          color="primary"
          textColor="white"
          className="etiquetapeque"
          style={{ top: '82%', left: '35.5%', width: '25px', height: '25px' }}
        ></CAvatar>
      </div>
      <ModalInfoSalones></ModalInfoSalones>
    </>
  )
}

export default AppSalonPrimerPiso
