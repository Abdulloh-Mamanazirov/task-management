import axios from "axios";
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
  Accordion,
  Typography,
  IconButton,
  CssBaseline,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { Login } from "../pages";
import { useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { CreateModal } from "../pages/commonPages/Sectors/components";
import { manager_routes, director_routes, employee_routes } from "./routes";

const drawerWidth = 240;

function index() {
  const [sectors, setSectors] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [routes, setRoutes] = useState([]);
  const state = useSelector((state) => state.sector);

  useEffect(() => {
    const status = sessionStorage.getItem("status");
    setStatus(status);
    getSectors();
  }, [state.change]);

  useEffect(() => {
    if (status === "director") setRoutes(director_routes);
    if (status === "manager") setRoutes(manager_routes);
    if (status === "xodim") setRoutes(employee_routes);
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
    <div className="h-screen flex flex-col">
      <Toolbar>
        <img
          src="https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png"
          alt="company logo"
          className="w-24 mx-auto"
        />
      </Toolbar>
      <Divider />
      <List>
        {routes
          .filter((item) => !!item.showInNav)
          .map((item, i) =>
            !item?.isLink ? (
              <ListItem key={i} disablePadding>
                <Link to={item?.path} className="w-full">
                  <ListItemButton>
                    <ListItemIcon>{item?.icon}</ListItemIcon>
                    <ListItemText primary={item?.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ) : (
              <ListItem className="px-4" key={i}>
                <Accordion disableGutters sx={{ boxShadow: "none" }}>
                  <AccordionSummary
                    expandIcon={<span className="fa-solid fa-chevron-down" />}
                  >
                    <div className="-ml-4 text-gray-500">{item?.icon}</div>
                    <p className="mx-[38px]">{item?.title}</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ol className="list-decimal pl-4">
                      {sectors?.map((item, ind) => (
                        <li key={ind} className="my-2">
                          <Link
                            className="font-normal "
                            to={`/${sessionStorage.getItem("status")}/sector/${
                              item?.id
                            }`}
                          >
                            {item?.name}
                          </Link>
                        </li>
                      ))}
                    </ol>
                    <CreateModal getData={getSectors} />
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            )
          )}
      </List>
      <div className="mt-auto p-3">
        <Button
          variant="contained"
          color="error"
          startIcon={<span className="fa-solid fa-arrow-right-from-bracket" />}
          size="small"
          onClick={handleLogOut}
          fullWidth
        >
          Chiqish
        </Button>
      </div>
    </div>
  );

  async function getSectors() {
    const response = await axios.get("bolim/");
    setSectors(response?.data);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: 10,
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
              Company
            </Typography>
          </div>
          <div className="ml-auto">
            <IconButton color="primary" size="large">
              <Link to="/my-profile">
                <span className="fa-solid fa-circle-user" />
              </Link>
            </IconButton>
            <Link to="/director/tasks">
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<span className="fa-solid fa-list-check" />}
              >
                Vazifa yuklash
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ zIndex: 10, width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
