import React from "react";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import logo from '../assests/logo.jpg';
//import logo_only from '../assests/logo_only.png';
import backgroundwide from "../assests/logo-login.png";
import logonobg from "../assests/logo-bg-no-tag.png"
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { useState } from "react";
import axios from "axios";
import baseUrl from "../util";

const LoginForm = () => {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#000000", // black color
      },
    },
  });

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const onSubmit = (data) => {
    axios({
      method: "post",
      url: baseUrl + `users/login`,
      headers: {},
      data: { email: data.email, password: data.password },
    })
      .then((response) => {
        const data = response.data;
        return data;
      })
      .then((respData) => {
        console.log(respData);

        if (respData.userModel.email === data.email) {
          var roles = respData.userModel.roles[0];
          dispatch(
            authActions.login({
              userId: respData.userModel.id,
              email: respData.userModel.email,
              image: respData.userModel.image,
              role: roles,
            })
          );
          dispatch(authActions.setCurrentRole({ role: roles }));
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          setErrorMessage("Please enter valid credentials.");
        }
      });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          //backgroundColor: "rgba(0, 0, 0, 0.5)", 
          backgroundImage: `url(${backgroundwide})`,
          backgroundColor: "rgba(0, 0, 0, 0.5)",  // Set background image
          backgroundSize: "cover",
          minHeight: "100vh", // Adjusted minHeight to fill entire viewport
          maxHeight: '100%',
          display: "flex",
          padding: "30",
          opacity: "10px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          overflowY: "auto", // Allow vertical scrolling
        }}
      >
        <div>
          <img src={logonobg} style={{ marginLeft: '100px', marginRight: '-200px', marginTop: '-100px' }}></img>
        </div>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
              borderRadius: "20px", // Rounded corners
              padding: "20px",
              opacity: "100%",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)", // Shadow effect
              textAlign: "center", // Centered content
              marginTop: "100px",
              marginBottom: 20,
              height: "450px",
              width: "450px"
            }}
          >
            <Avatar sx={{ m: "auto", bgcolor: "#424dbd" }}></Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginBottom: "20px" }}
            >
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                {...register("email", { required: true })}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                {...register("password", { required: true })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            {errorMessage && (
              <Box sx={{ mt: 2 }}>
                <Typography color="error">{errorMessage}</Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginForm;
