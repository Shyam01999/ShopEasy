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
import { Link } from "react-router-dom";
import Copyright from "../../../constant/copyright";
import { useFormik } from "formik";
import { resetpasswordSchema } from "../../../schemas";
import MetaData from "../../../constant/MetaData";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../constant/toastAlerts";
import { backendApi } from "../../../constant/api";

const defaultTheme = createTheme();

function Resetpassword({ setProgress }) {
  // const [open, setOpen] = useState(true);

  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setProgress(20);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, [setProgress]);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: resetpasswordSchema,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.put(
            `${backendApi}/api/auth/password/reset/${token}`,
            {
              password: values.password,
              confirmPassword: values.confirmPassword,
            }
          );
          if (res.data.message === "Password reset successful") {
            notifySuccess(res.data.message);
            setProgress(20);
            setTimeout(() => {
              setProgress(100);
            }, 1000);
            navigate("/");
          } else {
            notifyError(res.data.message);
            setProgress(20);
            setTimeout(() => {
              setProgress(100);
            }, 1000);
          }
          // alert("Password has been updated successfully");
        } catch (error) {
          console.log("Error in reset password", error);
        }
        action.resetForm();
      },
    });

  return (
    <div className="auth-container">
      <MetaData title="ShopEasy Resetpassword" />
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
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                      Reset Password
                    </Typography>
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      // noValidate
                      sx={{ fontSize: "1rem", mt: 1 }}
                    >
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
                        type="password"
                        margin="normal"
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        required
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          Boolean(touched.confirmPassword) &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          Boolean(touched.confirmPassword) &&
                          errors.confirmPassword
                        }
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Update New Password
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Typography variant="span">
                            Remember Password?
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
    </div>
  );
}

export default Resetpassword;
