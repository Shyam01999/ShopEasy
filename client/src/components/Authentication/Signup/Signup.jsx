import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Container,
  Grid,
  createTheme,
  ThemeProvider,
  Avatar,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import Copyright from "../../../constant/copyright";
import { useFormik } from "formik";
import { signupSchema } from "../../../schemas";
import MetaData from "../../../constant/MetaData";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/action/auth.actions";
import axios from "axios";
import { openModal } from "../../../redux/action/loginModal.action";
import noImage from "../../../images/user/no-user-image.jpg";
import { imageToBase64 } from "../../../constant/imageToBase64";

const defaultTheme = createTheme();
function Signup({ setProgress }) {
  // const [open, setOpen] = useState(true);
  // const handleOpen = () => setOpen(true);

  useEffect(() => {
    setProgress(20);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, [setProgress]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleClose = () => setOpen(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log("data", data);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      mobilenumber: "",
      role: "user",
      profileimage: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, action) => {
      console.log("values", values);
      dispatch(signup(values, navigate));
      setProgress(20);
      setTimeout(() => {
        setProgress(100);
      }, 1000);

      // action.resetForm();
    },
  });

  const handleProfile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await imageToBase64(file);
        setFieldValue("profileimage", base64);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    }
  };

  return (
    <div className="auth-container">
      <MetaData title="ShopEasy Signup" />
      {/* <Button onClick={handleOpen}>Login Modal</Button> */}
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} className="modal-container">
          
        </Fade>
      </Modal> */}

      <Box>
        <Container>
          <ThemeProvider theme={defaultTheme}>
            <Container
              component="main"
              maxWidth="xs"
              id="transition-modal-description"
            >
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="profile-container">
                  <Avatar
                    src={values.profileimage || noImage}
                    alt="Remy Sharp"
                    sx={{ m: 1, width: 60, height: 60, cursor: "pointer" }}
                  ></Avatar>
                  <input
                    type="file"
                    className="profile-image"
                    onChange={handleProfile}
                  />
                </div>
                <Typography component="h4" variant="h4">
                  Sign Up
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  // noValidate
                  // sx={{ fontSize: "1rem", mt: 1 }}
                >
                  <TextField
                    type="text"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    required
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.username) && Boolean(errors.username)
                    }
                    helperText={Boolean(touched.username) && errors.username}
                  />
                  <TextField
                    type="email"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={Boolean(touched.email) && errors.email}
                  />
                  <TextField
                    type="password"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="Password"
                    required
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={Boolean(touched.password) && errors.password}
                  />
                  <TextField
                    type="number"
                    margin="normal"
                    fullWidth
                    name="mobilenumber"
                    label="Mobile number"
                    id="mobilenumber"
                    autoComplete="mobilenumber"
                    required
                    value={values.mobilenumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.mobilenumber) &&
                      Boolean(errors.mobilenumber)
                    }
                    helperText={
                      Boolean(touched.mobilenumber) && errors.mobilenumber
                    }
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Typography variant="span">
                        Already have an account ?
                        <Link to="/login"> SignIn</Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 2, mb: 1 }} />
            </Container>
          </ThemeProvider>
        </Container>
      </Box>
    </div>
  );
}

export default Signup;
