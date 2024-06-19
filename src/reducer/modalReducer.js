import { createSelector } from 'reselect'
import { typesModal } from '../actions/modalesAction'

const { MODAL_INFO_SALONES,MODAL_CASO,SIDERBARSHOW } = typesModal

const initialState = {
  modalInfoSalonesShow: false,
  modalCasoShow: false,
  sidebarShow1:true
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_INFO_SALONES:
      return { ...state, ...action }
    case MODAL_CASO:
      return { ...state, ...action }
      case SIDERBARSHOW:
      return { ...state, ...action }
    default:
      return state
  }
}

const selectModalCaso = createSelector(
  (state) => state.modalReducer.modalCasoShow,
  (modalCasoShow) => modalCasoShow,
)

export default modalReducer
export { selectModalCaso }
