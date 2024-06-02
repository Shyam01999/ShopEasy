import { useState } from "react";
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

const defaultTheme = createTheme();
function Signup() {
  const [open, setOpen] = useState(true);
  // const handleOpen = () => setOpen(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log("data", data);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        mobilenumber: "",
        role:"user"
      },
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
        console.log("values", values);
        dispatch(signup(values, navigate));
        
        // action.resetForm();
      },
    });

  return (
    <div>
      <MetaData title="ShopEasy Signup" />
      {/* <Button onClick={handleOpen}>Login Modal</Button> */}
      <Modal
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
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
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
                        helperText={
                          Boolean(touched.username) && errors.username
                        }
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
                        helperText={
                          Boolean(touched.password) && errors.password
                        }
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
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign Up
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Typography variant="span">
                            Already have an account?
                            <Link to="/login"> SignIn</Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Copyright sx={{ mt: 4, mb: 2 }} />
                </Container>
              </ThemeProvider>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Signup;
