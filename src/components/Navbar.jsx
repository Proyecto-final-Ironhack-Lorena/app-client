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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import '@fontsource/roboto/300.css';
import * as BackendService from "../services/auth.services";


function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState(null);


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

  const handlegetUserData = async () => {
    const response = await BackendService.getUserData();
    setUserData(response.data);
  };

  useEffect(() => {
    handlegetUserData();
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", backgroundColor: "#CFDEBA" }} >
      <Typography variant="h6" sx={{ my: 2 }}>
        Momizy
      </Typography>
      <Divider />
      <List sx={{backgroundColor: "#EAF2DE"}}>
        {!context.logged && (
          <ListItem disablePadding>
              <Link
                to="/auth/signup"
                className="a"
                style={{width: '100%'}}
              >
            <ListItemButton sx={{ textAlign: "center"}}>

                <ListItemText primary="Registro" />
            </ListItemButton>

              </Link>
          </ListItem>
        )}
        {!context.logged && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center"}}>
              <Link
                to="/auth/login"
                style={{ width: '100%'}}
                className="a"
              >
                <ListItemText primary="Iniciar Sesión" />
              </Link>
            </ListItemButton>
          </ListItem>
        )}
        {context.logged && (
          <ListItem disablePadding>
              <Link
                to="/preguntas"
                style={{ width: '100%'}}
                className="a"
              >
            <ListItemButton sx={{ textAlign: "center" }}>

                <ListItemText primary="Preguntas y respuestas" />
            </ListItemButton>

              </Link>
          </ListItem>
        )}
        {context.logged && (
          <ListItem disablePadding>
              <Link
                to="/diario"
                style={{ width: '100%'}}
                className="a"
              >
            <ListItemButton sx={{ textAlign: "center" }}>

                <ListItemText primary="Mi Diario" />
            </ListItemButton>

              </Link>
          </ListItem>
        )}
        {context.logged && (
          <ListItem disablePadding>
              <Link
                to="/listas"
                style={{ width: '100%'}}
                className="a"
              >
            <ListItemButton sx={{ textAlign: "center" }}>

                <ListItemText primary="Mis Listas" />
            </ListItemButton>

              </Link>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container = window.document.body;

  return (
    <Box sx={{ display: "flex", marginBottom: '5rem'}}>
      <AppBar component="nav" >
        <Toolbar sx={{ backgroundColor: "#CFDEBA", justifyContent: "space-between"}}>
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
                <Link
                  to="/auth/signup"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
              <Button sx={{ color: "#fff" }}>

                  Registro
              </Button>

                </Link>
            </Box>
          )}
          {!context.logged && (
            <Box sx={{ display: { xs: "none", sm: "block", backgroundColor: "#bace9c", marginLeft: "1rem", borderRadius: "7px"} }}>
                <Link
                  to="/auth/login"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
              <Button sx={{ color: "#fff" }}>

                  Iniciar Sesión
              </Button>

                </Link>
            </Box>
          )}
          {context.logged && (
            <Box sx={{ display: { xs: "none", sm: "block", backgroundColor: "#bace9c", borderRadius: "7px" } }}>
                <Link
                  to="/preguntas"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
              <Button sx={{ color: "#fff" }}>

                  Preguntas y respuestas
              </Button>

                </Link>
            </Box>
          )}
          {context.logged && (
            <Box sx={{ display: { xs: "none", sm: "block", backgroundColor: "#bace9c", borderRadius: "7px", marginLeft: "1rem"  } }}>
                <Link
                  to="/diario"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
              <Button sx={{ color: "#fff"}}>

                  Mi Diario
              </Button>

                </Link>
            </Box>
          )}
          {context.logged && (
            <Box sx={{ display: { xs: "none", sm: "block", backgroundColor: "#bace9c", borderRadius: "7px", marginLeft: "1rem"  } }}>
                <Link
                  to="/listas"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
              <Button sx={{ color: "#fff"}}>

                  Mis Listas
              </Button>

                </Link>
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
            <Box sx={{ flexGrow: 0, justifySelf: "flex-end" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userData && userData.username} src={userData && userData.image} />
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
                
                  <Link textAlign="center" to="/profile" className="a">
                  <MenuItem onClick={handleCloseUserMenu} sx={{textDecoration: "none"}}>Perfil
                  </MenuItem>
                  </Link>
                
                <MenuItem onClick={handleCloseUserMenu} sx={{textDecoration: "none"}}>
                  <Link textAlign="center" to="/signout" className="a">
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
