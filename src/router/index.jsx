import { useState, useEffect } from "react";
import {
  Box,
  List,
  Drawer,
  AppBar,
  Button,
  Divider,
  Toolbar,
  ListItem,
  Typography,
  IconButton,
  CssBaseline,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import { manager_routes, director_routes, employee_routes } from "./routes";
import { Login } from "../pages";

const drawerWidth = 240;

function index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const status = sessionStorage.getItem("status");
    setStatus(status);
  }, []);

  useEffect(() => {
    if (status === "director") setRoutes(director_routes);
    if (status === "manager") setRoutes(manager_routes);
    if (status === "employee") setRoutes(employee_routes);
  }, [status]);

  if (!status) return <Login />;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    window.location.reload();
    return <Login />;
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {routes
          .filter((item) => !!item.showInNav)
          .map((item) => (
            <ListItem key={item?.key} disablePadding>
              <Link to={item?.path} className="w-full">
                <ListItemButton>
                  <ListItemIcon>{item?.icon}</ListItemIcon>
                  <ListItemText primary={item?.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="bg-white text-black">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <span className="fa-solid fa-bars" />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Some title
            </Typography>
          </div>
          <div className="ml-auto">
            <IconButton color="primary" size="large">
              <Link to="/my-profile">
                <span className="fa-solid fa-circle-user" />
              </Link>
            </IconButton>
            <Button
              variant="contained"
              color="error"
              startIcon={
                <span className="fa-solid fa-arrow-right-from-bracket" />
              }
              size="small"
              onClick={handleLogOut}
            >
              Chiqish
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation bar"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar className="mb-5 sm:mb-0" />
        <Routes>
          {routes.map((route) => (
            <Route key={route.key} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}

export default index;

/*
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { director_routes, manager_routes, employee_routes } from "./routes";

const index = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const status = sessionStorage.getItem("status");
    setStatus(status);
  }, []);

  if (status === "director") {
    return (
      <>
        <nav>
          <ol>
            {director_routes
              .filter((item) => !!item.showInNav)
              .map((item) => (
                <li key={item?.key}>
                  <Link to={item.path}>{item?.title}</Link>
                </li>
              ))}
          </ol>
        </nav>
        <hr />
        <Routes>
          {director_routes.map((route) => (
            <Route key={route.key} path={route.path} element={route.element} />
          ))}
        </Routes>
      </>
    );
  }

  if (status === "admin") {
    return (
      <>
        <nav>
          <ol>
            {manager_routes
              .filter((item) => !!item.showInNav)
              .map((item) => (
                <li>
                  <Link to={item.path}>{item?.title}</Link>
                </li>
              ))}
          </ol>
        </nav>
        <hr />
        <Routes>
          {manager_routes.map((route) => (
            <Route key={route.key} path={route.path} element={route.element} />
          ))}
        </Routes>
      </>
    );
  }

  if (status === "employee") {
    return (
      <>
        <nav>
          <ol>
            {employee_routes
              .filter((item) => !!item.showInNav)
              .map((item) => (
                <li>
                  <Link to={item.path}>{item?.title}</Link>
                </li>
              ))}
          </ol>
        </nav>
        <hr />
        <Routes>
          {employee_routes.map((route) => (
            <Route key={route.key} path={route.path} element={route.element} />
          ))}
        </Routes>
      </>
    );
  }
};

export default index;
*/
