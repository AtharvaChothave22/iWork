import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import for login link
import baseUrl from "../util";

const AddUser = () => {
  const names = ["DOCTOR", "PATIENT", "COMPOUNDER"];
  const [selectedNames, setSelectedNames] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    var name = `${data.firstName}${" "}${data.lastName}`;
    axios({
      method: "post",
      url: baseUrl + `users/addUser`,
      headers: {},
      data: {
        name: name,
        email: data.email,
        password: data.password,
        accountType: selectedNames,
      },
    }).then(() => navigate("/"));
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{ boxShadow: 4, borderRadius: 2, p: 2, padding: 3, marginTop: 20 }}
      >
        <Typography variant="h5" align="center">
          Add User
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
                {...register("lastName", { required: "Last Name is required" })}
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
              pattern: /^\S+@\S+$/i,
            })}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password", { required: "Password is required" })}
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Grid item xs={10} sm={12} sx={{ padding: 1 }}>
            {/* {/////////////////////////////////////////////////} */}
            <InputLabel> Select one or many roles</InputLabel>
            <Select
              {...register("roles", { required: "roles are needed" })}
              multiple
              value={selectedNames}
              onChange={(e) => setSelectedNames(e.target.value)}
              input={<OutlinedInput />}
              error={!!errors.roles}
              helperText={errors.roles?.message}
              renderValue={(selected) => (
                <Stack gap={1} direction="row" flexWrap="wrap">
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() =>
                        setSelectedNames(
                          selectedNames.filter((item) => item !== value)
                        )
                      }
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                    />
                  ))}
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

          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddUser;