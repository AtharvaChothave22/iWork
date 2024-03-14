import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import logo from '../src/assests/logo.jpg'
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Box,
  MenuItem,
  Select,
  InputLabel,
  OutlinedInput,
  Stack,
  Chip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import for login link
import baseUrl from "./util";
import signup from '../src/assests/SignUp.jpg';
const SignUpForm = () => {
  const names = ["FREELANCER", "RECRUITER"];
  const [selectedNames, setSelectedNames] = useState("");
  const navigate = useNavigate();
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#000000", // black color
      },
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Add watch function from react-hook-form
  } = useForm();

  // Watch the password field
  const password = watch("password", "");

  const onSubmit = (data) => {
    var name = `${data.firstName}${" "}${data.lastName}`;
    axios({
      method: "post",
      url: baseUrl + `users/register`,
      headers: {},
      data: {
        name: name,
        email: data.email,
        mobileNumber: data.mobileNumber,
        password: data.password,
        roleType: selectedNames,
      },
    }).then(() => navigate("/"));
    console.log(data);
  };

  return (
    <div style={{ border: '1px solid black', display: "flex", gap: '20px' }}>


      <ThemeProvider theme={customTheme}>
        <Container component="main" maxWidth="xs" >
          <Box
            sx={{
              boxShadow: 4,
              borderRadius: 2,
              p: 2,
              padding: 3,
              marginTop: 2,
            }}
          >
            <Typography variant="h5" align="center">
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    label="First Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Grid>
              </Grid>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email" },
                })}
                label="Email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                {...register("mobileNumber", {
                  required: "Mobile is required",
                  pattern: { value: /^(?:\+91|0)?\d{10}$/, message: "Invalid mobile number" },
                })}
                label="Mobile"
                fullWidth
                margin="normal"
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber?.message}
              />
              <TextField
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: "Invalid password format ex: Xyz@123",
                  },
                })}
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              {/* Add Confirm Password field */}
              <TextField
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                label="Confirm Password"
                fullWidth
                margin="normal"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />

              <Grid item xs={10} sm={12} sx={{ paddingBottom: 5 }}>
                <InputLabel>Select Your Role</InputLabel>
                <Select
                  {...register("roles", { required: "roles are needed" })}
                  sx={{ width: "100%" }}
                  maxWidth={false}
                  value={selectedNames}
                  onChange={(e) => setSelectedNames(e.target.value)}
                  input={<OutlinedInput />}
                  error={!!errors.roles}
                  helperText={errors.roles?.message}
                  renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                      {selected}
                    </Stack>
                  )}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Button type="submit" fullWidth variant="contained" color="info">
                Sign Up
              </Button>
              <Typography variant="body2" align="center" mt={2}>
                Already have an account? <Link to="/login">Log in</Link>{" "}
              </Typography>
            </form>
          </Box>
        </Container>
      </ThemeProvider>

      <div style={{ width: '50%', marginTop: "25px", marginRight: '20px' }}>
        <img width={'98%'} height={'650px'} src={signup} alt="error" />
      </div>
    </div>
  );
};

export default SignUpForm;