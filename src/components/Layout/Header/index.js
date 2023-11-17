import { AppBar, Badge, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../../auth/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {

  const { logout, user, userId, userRole } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  // const [hover, setHover] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    logout();
    navigate('/', { replace: true });
  };

  // const handleMouseHover = () => {
  //   setHover(true);
  // }

  // const handleMouseLeave = () => {
  //   setHover(false);
  // }

  // Access value associated with the key
  var userName = sessionStorage.getItem("userName");
  var role = sessionStorage.getItem("userRole");

  const longText = <div><h5>{userName}</h5><h5>{role}</h5></div>;

  return (
    <>
      <div className="header">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">

            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                noWrap
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                MUI
              </Typography>
              <Box sx={{ flexGrow: 4 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <Tooltip title={longText}>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"                    
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Tooltip>

                {/* <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"                    
                    color="inherit"
                    onMouseOver={handleMouseHover}
                    onMouseLeave={handleMouseLeave}
                  >
                    <AccountCircle />
                  </IconButton>

                {
                  hover && (
                    <Box sx={{minWidth: 275}}>
                      <Card variant="outlined">

                      </Card>
                    </Box>
                  )
                } */}

                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleClickOpen}
                  color="inherit"
                >
                  <span data-tooltip-content="Logout">
                    <LogoutIcon />
                  </span>
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Logout Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAgree} autoFocus>Agree</Button>
          </DialogActions>
        </Dialog>

      </div>
    </>
  );
};

export default Header;
