import { toast } from "react-toastify";

//sucess toast alert 
export const notifySuccess = (message) =>
  toast.success(`${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      fontSize: "1.5rem", // Set your desired font size
    },
  });

//error toast alert 
export const notifyError = (message) =>
  toast.error(`${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      fontSize: "1.5rem", // Set your desired font size
    },
  });

//warning toast alert  
export const notifyWarning = (message) => {
  toast.warn(`${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      fontSize: "1.5rem", // Set your desired font size
    },
  });
}