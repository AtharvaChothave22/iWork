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
import logo from '../assests/logo.jpg'
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
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
      });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ width: '60%', height: '500px' }}>
          <img width={'100%'} src={logo} alt="Company_logo" />
        </div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              padding: 3,
              boxShadow: 4,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)} // Pass the onSubmit function to handleSubmit
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("email", { required: true })} // Register the input with react-hook-form
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
                {...register("password", { required: true })} // Register the input with react-hook-form
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
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" style={{ textAlign: 'center', marginRight: '70px' }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default LoginForm;
