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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import Copyright from "../../../constant/copyright";
import { useFormik } from "formik";
import { forgotpasswordSchema } from "../../../schemas";
import MetaData from "../../../constant/MetaData";
import { useDispatch } from "react-redux";
import { forgotpassword } from "../../../redux/action/auth.actions";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function Forgotpassword({ setProgress }) {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setProgress(20);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, [setProgress]);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotpasswordSchema,
      onSubmit: (values, action) => {
        dispatch(forgotpassword(values, navigate));
        action.resetForm();
        setProgress(20);
        setTimeout(() => {
          setProgress(100);
        }, 1000);
      },
    });

  return (
    <div className="auth-container">
      <MetaData title="ShopEasy forgotpassword" />
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
                  height:"100%"
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                  Forgot Password
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  // noValidate
                  sx={{ fontSize: "1rem", mt: 1 }}
                >
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Continue
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
              <Copyright sx={{ mt: 2  , mb: 2 }} />
            </Container>
          </ThemeProvider>
        </Container>
      </Box>
    </div>
  );
}

export default Forgotpassword;
