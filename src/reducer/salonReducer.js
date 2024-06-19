import { createSelector } from 'reselect'
import { typesSalones } from '../actions/salonAction'

const { INFO_SALON, HORARIO_SALON } = typesSalones

const initialState = {
  infoSalonesData: [],
  horarioSalonData: [],
}

const salonReducer = (state = initialState, action) => {
  switch (action.type) {
    case INFO_SALON:
      return { ...state, ...action }
    case HORARIO_SALON:
      return { ...state, ...action }
    default:
      return state
  }
}

export default salonReducer
