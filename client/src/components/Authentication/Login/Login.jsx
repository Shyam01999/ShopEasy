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
  Avatar,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  createTheme,
  ThemeProvider,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import Copyright from "../../../constant/copyright";
import { useFormik } from "formik";
import { loginSchema } from "../../../schemas";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/action/auth.actions";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../constant/MetaData";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { openModal } from "../../../redux/action/loginModal.action";
import { FcGoogle } from "react-icons/fc";

const defaultTheme = createTheme();

function Login({ setProgress }) {
  // const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const open = useSelector((state) => state.loginModalReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleOpen = () => dispatch(openModal(true));
  // const handleClose = () => dispatch(openModal(false));

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setProgress(20);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, [setProgress]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "shyamsundarsahoo98@gmail.com",
        password: "123456789",
      },
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        dispatch(login(values, navigate));
        action.resetForm();
        setProgress(20);
        setTimeout(() => {
          setProgress(100);
        }, 1000);
      },
    });

  const handleGoogleSignin = () => {
    console.log("hello");
    window.open("http://localhost:8080/auth/google/callback", "_self")
  };

  return (
    <div className="auth-container">
      <MetaData title="ShopEasy Login" />
      {/* <Button onClick={handleOpen} className="commonBtn">
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} className="modal-container"></Fade>
      </Modal> */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
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
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                  Welcome
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ fontSize: "1rem", mt: 1 }}
                >
                  <TextField
                    type="email"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={Boolean(touched.email) && errors.email}
                  />
                  <TextField
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    required
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={Boolean(touched.password) && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 1, mb: 2 }}
                    onClick={handleGoogleSignin}
                    startIcon={<FcGoogle />}
                  >
                    Sign in with Google
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Typography variant="span">
                        <Link to="/forgotpassword">Forgot password?</Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="span">
                        Don't have an account?
                        <Link to="/signup"> SignUp</Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 2, mb: 2 }} />
            </Container>
          </ThemeProvider>
        </Container>
      </Box>
    </div>
  );
}

export default Login;
