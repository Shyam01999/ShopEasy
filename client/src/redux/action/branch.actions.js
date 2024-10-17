import {
    branchAddPost,
    branchAllDataPost,
    branchCountPost,
    branchDeletePost,
    branchPagiDataPost,
    branchStatusChangePost,
    branchUpdatePost,
  } from "../../constants/api";
  import {
    notifyError,
    notifySuccess,
    notifyWarning,
  } from "../../constants/toastAlert";
  import axios from "axios";
import { FETCH_BRANCH_COUNT, FETCH_BRANCH_DATA } from "../actionTypes/branch.actionTypes";
import { RELOAD } from "../actionTypes/load.actionTypes";
  
  
  //Get all branch data using pagination wise
  export const branchPagiData = (backendData, setLoading) => async (dispatch) => {
    try {
      const res = await axios.post(branchPagiDataPost, backendData);
      const initialData =
        res.data && res.data.data && res.data.data.length > 0 ? res.data : [];
      if (initialData) {
        dispatch({ type: FETCH_BRANCH_DATA, payload: initialData });
      } else {
        notifyError(res.data.message);
      }
      dispatch({ type: RELOAD, payload: false });
      setLoading(false);
    } catch (error) {
      console.log(`Error in fetching branch data ${error}`);
      notifyError(error.message);
    }
  };
  
  //Get branch auto increment count
  export const branchAutoCount =(backendData, setLoading) => async (dispatch) => {
      try {
        const res = await axios.post(branchCountPost, backendData);
        const initialCount = Number(res.data.count) + 1 || 0;
          if(initialCount != 0) {
          dispatch({ type: FETCH_BRANCH_COUNT, payload: initialCount });
        } else {
          notifyError('Count not comming from backend');
        }
        dispatch({ type: RELOAD, payload: false });
        setLoading(false);
      } catch (error) {
        console.log(`Error in fetching branch data ${error}`);
        notifyError(error.message);
      }
    };
  
  //Status change dispatcher
  export const branchStatusChange = (backendData) => async (dispatch) => {
    try {
      // dispatch({ type: RELOAD, payload: true });
      const res = await axios.post(branchStatusChangePost, backendData);
      console.log("res", res);
      if (res.data.message === "Branch Activated") {
        notifySuccess(res.data.message);
      } else {
        notifyWarning(res.data.message);
      }
      dispatch({ type: RELOAD, payload: true });
    } catch (error) {
      console.log(`Error in changing company status ${error}`);
      notifyError(error.message);
    }
  };
  
  //Delete branch data dispatcher
  export const deleteBranch = (backendData, handleClose) => async (dispatch) => {
    try {
      const res = await axios.post(branchDeletePost, backendData);
      if (res.data.message == "Branch deleted successfully") {
        notifySuccess(res.data.message);
      } else {
        notifyError(res.data.message);
      }
      handleClose();
      dispatch({ type: RELOAD, payload: true });
    } catch (error) {
      console.log(`Error in deleting branch data ${error}`);
      notifyError(error.message);
    }
  };
  
  //Acion dispatcher for adding new company data
  export const addBranch = (backendData, navigate) => async (dispatch) => {
    try {
      dispatch({ type: RELOAD, payload: true });
      const res = await axios.post(branchAddPost, backendData);
      if (res.data.message === "Branch added successfully") {
        notifySuccess(res.data.message);
        navigate("/admin/branch");
      } else {
        notifyError(res.data.message);
      }
    } catch (error) {
      // dispatch({ type: LOGIN_FAILURE, payload: error.message });
      console.log(`Error in adding branch data ${error}`);
      notifyError(error.message);
    }
  };
  
  //Acion dispatcher for updating branch data
  export const updateBranch = (backendData, navigate) => async (dispatch) => {
    try {
      dispatch({ type: RELOAD, payload: true });
      const res = await axios.post(branchUpdatePost, backendData);
      console.log("res",res);
      if (res.data.message === "Branch updated successfully") {
        notifySuccess(res.data.message);
        navigate("/admin/branch");
      } else {
        notifyError(res.data.message);
      }
    } catch (error) {
      // dispatch({ type: LOGIN_FAILURE, payload: error.message });
      console.log(`Error in updating branch data ${error}`);
      notifyError(error.message);
    }
  };