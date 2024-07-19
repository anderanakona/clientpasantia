import { createSelector } from 'reselect'
import { typesSalones } from '../actions/salonAction'

const { INFO_SALON, HORARIO_SALON,INFO_SALON_SABADO } = typesSalones

const initialState = {
  infoSalonesData: [],
  horarioSalonData: [],
  horarioSalonDataSabado: [],
}

const salonReducer = (state = initialState, action) => {
  switch (action.type) {
    case INFO_SALON:
      return { ...state, ...action }
    case HORARIO_SALON:
      return { ...state, ...action }
      case INFO_SALON_SABADO:
      return { ...state, ...action }
    default:
      return state
  }
}

export default salonReducer
