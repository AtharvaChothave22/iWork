import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Typography,
  createTheme,
  ThemeProvider,
  IconButton,
  TextField,
} from "@mui/material";
import baseUrl from "../util";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const defaultTheme = createTheme();
  const [users, setUsers] = useState([]);
  const [editableUser, setEditableUser] = useState(null); // Track the user being edited
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRoles, setEditedRoles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`${baseUrl}admin/getUsers`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, [count]);

  const handleEdit = (user) => {
    setEditedName(user.name);
    var arrRoles = [];
    for (let r of user.roles) {
      arrRoles.push(r.roleName);
    }

    console.log(arrRoles);
    setEditedRoles(arrRoles);
    setEditedEmail(user.email);

    var newCount = count + 1;
    setCount(newCount);
    setEditableUser(user.userId);
  };

  const handleDelete = (user) => {
    axios({
      method: "delete",
      url: baseUrl + `users/deleteUser/${user.userId}`,
      headers: {},
    })
      .then(() => {
        var newCount = count + 1;
        setCount(newCount);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cancelEdit = () => {
    setEditableUser(null);
  };

  const saveEdit = (id, user) => {
    var arrRoles = [];
    for (let r of user.roles) {
      arrRoles.push(r.roleName);
    }
    axios({
      method: "put",
      url: baseUrl + `users/updateUser/${user.userId}`,
      headers: {},
      data: {
        name: editedName,
        email: editedEmail,
        password: user.password,
        accountType: editedRoles,
      },
    })
      .then(() => {
        var newCount = count + 1;
        setCount(newCount);
      })
      .catch((error) => {
        console.error(error);
      });

    var newCount = count + 1;
    setCount(newCount);
    setEditableUser(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="false" sx={{ padding: 10, marginTop: 2 }}>
        <Typography variant="h5" align="center" sx={{ padding: 1 }}>
          List of All Users
        </Typography>
        <br></br>
        <Button
          sx={{ boxShadow: 4, bottom: 5 }}
          variant="contained"
          onClick={() => navigate("/addUser")}
        >
          Add User
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{ border: 2, textDecorationColor: "ActiveCaption" }}
              >
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>
                    {editableUser === user.userId ? (
                      <TextField
                        defaultValue={user.name}
                        fullWidth
                        label="Full Name"
                        variant="standard"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editableUser === user.userId ? (
                      <TextField
                        defaultValue={user.roles
                          .map((role) => role.roleName)
                          .join(", ")}
                        fullWidth
                        label="Roles"
                        variant="standard"
                        value={editedRoles}
                        onChange={(e) => setEditedRoles(e.target.value)}
                        error={!!errors.roles}
                        helperText={errors.roles?.message}
                      />
                    ) : (
                      user.roles.map((f) => f.roleName + ", ")
                    )}
                  </TableCell>
                  <TableCell>
                    {editableUser === user.userId ? (
                      <TextField
                        defaultValue={user.email}
                        fullWidth
                        label="email"
                        variant="standard"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editableUser === user.userId ? (
                      <>
                        <IconButton
                          aria-label="Save"
                          onClick={handleSubmit((data) =>
                            saveEdit(user.userId, user)
                          )}
                        >
                          <SaveIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Cancel"
                          onClick={() => cancelEdit()}
                        >
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          aria-label="Edit"
                          onClick={() => handleEdit(user)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          onClick={() => handleDelete(user)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Landing;
