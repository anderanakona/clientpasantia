/**
 * @name typesSalones
 * @description Tipos manejados por las acciones de react-redux
 * para identificar los reducer
 */

const INFO_SALON = 'INFO_SALON'
const HORARIO_SALON = 'HORARIO_SALON'
const INFO_SALON_SABADO = 'INFO_SALON_SABADO'

const typesSalones = {
  INFO_SALON,
  HORARIO_SALON,
  INFO_SALON_SABADO
}

function InfoSalon(payload) {
  return { type: INFO_SALON, payload } // modal:payload   // pendiente de agregar cuando se habilite typescript
}
function InfoHorarioSalon(payload) {
  return { type: HORARIO_SALON, payload } // modal:payload   // pendiente de agregar cuando se habilite typescript
}
function InfoHorarioSalonSabado(payload) {
  return { type: INFO_SALON_SABADO, payload } // modal:payload   // pendiente de agregar cuando se habilite typescript
}

export { InfoSalon, InfoHorarioSalon,InfoHorarioSalonSabado, typesSalones }
