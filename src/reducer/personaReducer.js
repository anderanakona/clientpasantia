import { createSelector } from 'reselect'
import { typesPersona } from '../actions/personaAction' 

const { INFO_PERSONA } = typesPersona

const initialState = {
  infoPersonaData: {},
}

const personaReducer = (state = initialState, action) => {
  switch (action.type) {
    case INFO_PERSONA:
      return { ...state, ...action }
    default:
      return state
  }
}

export default personaReducer
