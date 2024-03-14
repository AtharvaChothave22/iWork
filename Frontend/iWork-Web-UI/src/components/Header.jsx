import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import logowide from '../assests/logo-wide.jpg';
import logobg from '../assests/logo-bg.png';
import logobgnotag from '../assests/logo-bg-no-tag.png';

const navigationLinks = [
  // { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userName);
  const userImage = useSelector((state) => state.auth.userImage);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    navigate("/");
    dispatch(authActions.logout());
  };

  const login = () => {
    navigate("/login");
  };



  return (
    <AppBar
      position="static"
      style={{ marginRight: "10px", backgroundColor: "#000000" }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {!isLoggedIn && (
            <Link to='/'>
              <img height={'60px'} width={'150px'} style={{ cursor: 'pointer', marginTop: '10px' }} src={logobgnotag} />
            </Link>
          )}

          {isLoggedIn && (
            <Link to='/login'>
              <img height={'60px'} width={'150px'} style={{ cursor: 'pointer', marginTop: '10px' }} src={logobgnotag} />
            </Link>
          )}


        </Typography>

        {isLoggedIn && (
          <>
            {userImage ? (
              <img
                onClick={() => navigate("/profile")}
                src={userImage}
                alt="User Profile"
                style={{
                  cursor: "pointer",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
            ) : (
              <AccountCircleIcon
                onClick={() => navigate("/profile")}
                sx={{ marginRight: 1, cursor: "pointer" }}
              />
            )}
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              {userName}
            </Typography>
            <Button variant="outlined" onClick={logout} color="inherit">
              Logout
            </Button>
          </>
        )}

        {!isLoggedIn && (
          <Button variant="outlined" onClick={login} color="inherit">
            Login
          </Button>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {navigationLinks.map((link) => (
            <MenuItem key={link.label} onClick={handleClose}>
              <Button component={Link} to={link.path}>
                {link.label}
              </Button>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
