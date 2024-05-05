import {
    FETCH_ALL_BRANCH_DATA,
    FETCH_BRANCH_COUNT,
    FETCH_BRANCH_DATA,
  } from "../actionTypes/branch.actionTypes";
  
  const initialState = {
    branchPagiData: {},
    branchCount:0
  };
  
  //
  export const branchReducer = (state = initialState, { type, payload }) => {
    // console.log("payload",payload)
    switch (type) {
      case FETCH_BRANCH_DATA: {
        return { ...state, branchPagiData: { ...payload } };
      }
  
      case FETCH_BRANCH_COUNT: {
        return { ...state, branchCount: payload  };
      }
  
      default: {
        return state;
      }
    }
  };