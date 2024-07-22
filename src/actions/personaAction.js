/**
 * @name typesPersona
 * @description Tipos manejados por las acciones de react-redux
 * para identificar los reducer
 */

const INFO_PERSONA = 'INFO_PERSONA'
const typesPersona = {
    INFO_PERSONA
}

function InfoPersona(payload) {
  return { type: INFO_PERSONA, payload } // modal:payload   // pendiente de agregar cuando se habilite typescript
}

export { InfoPersona, typesPersona }
