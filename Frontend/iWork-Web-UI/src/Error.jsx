import { Typography } from "@mui/material";
import React from "react";
const Error = ({ message }) => {
  return (
    <Typography variant="h3" align="center">
      {message}
    </Typography>
  );
};

export default Error;
