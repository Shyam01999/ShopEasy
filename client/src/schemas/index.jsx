import * as Yup from "yup";
// import  phone  from "yup-phone";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const signupSchema = Yup.object({
  username: Yup.string().min(2).max(50).required("Please enter your username"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
//   mobilenumber: phone("IN", true, "Invalid Indian phone number format")
//     .min(10)
//     .max(12)
//     .required("Please enter your password"),
  mobilenumber: Yup.string().min(10).max(12).required("Please enter your mobilenumber"),
});

export const forgotpasswordSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});

export const resetpasswordSchema = Yup.object({
  password: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required("Please enter your password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

// export const resetpasswordSchema = Yup.object().shape({
//     password: Yup.string().min(6).required("Please enter your password"),
//     confirmpassword: Yup.string()
//       .required("Please confirm your password")
//       .oneOf([Yup.ref('password')], "Passwords must match"), // Reference directly
//   });
