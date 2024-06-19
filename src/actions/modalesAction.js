/**
 * @name typesModalCaso
 * @description Tipos manejados por las acciones de react-redux
 * para identificar los diferentes modales
 */

const MODAL_INFO_SALONES = 'MODAL_INFO_SALONES'
const SIDERBARSHOW = 'SIDERBARSHOW'


const typesModal = {
  MODAL_INFO_SALONES,SIDERBARSHOW
}

function modalInfoSalones(payload) {
  return { type: MODAL_INFO_SALONES, payload } // modal:payload   // pendiente de agregar cuando se habilite typescript
}

function sidebarShow1(payload) {
  return { type: MODAL_INFO_SALONES, payload } // modal:payload   // pendiente de agregar cuando se habilite typescript
}

export { modalInfoSalones,sidebarShow1, typesModal }
