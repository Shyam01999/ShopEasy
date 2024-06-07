import { OPEN_LOGIN_MODAL } from "../actionTypes/loginTogle.action"

export const openModal = (load) => {
  return {
    type: OPEN_LOGIN_MODAL,
    payload: load,
  }
}