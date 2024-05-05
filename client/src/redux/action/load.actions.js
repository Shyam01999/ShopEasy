import { RELOAD } from "../actionTypes/load.actionTypes";


export const reloadPage = (load) => {
    return {
      type: RELOAD,
      payload: load,
    }
  }