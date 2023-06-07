import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import '@fontsource/roboto/300.css';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const context = useContext(AuthContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", backgroundColor: "#CFDEBA" }} >
      <Typography variant="h6" sx={{ my: 2 }}>
        Momizy
      </Typography>
      <Divider />
      <List sx={{backgroundColor: "#EAF2DE"}}>
        {!context.logged && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center"}}>
              <Link
                to="/auth/signup"
                style={{ textDecoration: "none"  }}
              >
                <ListItemText primary="Registro" />
              </Link>
            </ListItemButton>
          </ListItem>
        )}
        {!context.logged && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center"}}>
              <Link
                to="/auth/login"
                style={{ textDecoration: "none"}}
              >
                <ListItemText primary="Iniciar Sesión" />
              </Link>
            </ListItemButton>
          </ListItem>
        )}
        {context.logged && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                to="/preguntas"
                style={{ textDecoration: "none"}}
              >
                <ListItemText primary="Preguntas y respuestas" />
              </Link>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container = window.document.body;

  return (
    <Box sx={{ display: "flex", marginBottom: '5rem'}}>
      <AppBar component="nav" >
        <Toolbar sx={{ backgroundColor: "#CFDEBA"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {!context.logged && (
            <Box sx={{ display: { xs: "none", sm: "block", backgroundColor: "#bace9c", borderRadius: "7px"} }}>
              <Button sx={{ color: "#fff" }}>
                <Link
                  to="/auth/signup"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Registro
                </Link>
              </Button>
            </Box>
          )}
          {!context.logged && (
            <Box sx={{ display: { xs: "none", sm: "block", backgroundColor: "#bace9c", marginLeft: "1rem", borderRadius: "7px"} }}>
              <Button sx={{ color: "#fff" }}>
                <Link
                  to="/auth/login"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Iniciar Sesión
                </Link>
              </Button>
            </Box>
          )}
          {context.logged && (
            <Box sx={{ display: { xs: "none", sm: "block", backgroundColor: "#bace9c", borderRadius: "7px" } }}>
              <Button sx={{ color: "#fff" }}>
                <Link
                  to="/preguntas"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Preguntas y respuestas
                </Link>
              </Button>
            </Box>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block", marginRight:  "12rem"} }}
          >
            Momizy
          </Typography>
          {context.logged && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px"}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu} sx={{textDecoration: "none"}}>
                  <Link textAlign="center" to="/profile">
                    Perfil
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu} sx={{textDecoration: "none"}}>
                  <Link textAlign="center" to="/signout">
                    Cerrar Sesión
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
