import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, NavLink, useParams } from "react-router-dom";
import brandLogo from "../.././images/shopeasy_logo.png";
import Login from "../Authentication/Login/Login";
import { FaShoppingCart } from "react-icons/fa";
import MetaData from "../../constant/MetaData";

const pages = [
  {
    path: "/cart",
    name: "Cart",
    icon: <FaShoppingCart />,
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   // icon: <FaUserEdit />,
  // },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar({ children }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <MetaData title="ShopEasy Home" />
      <AppBar position="sticky" className="header-container">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box>
              <Link to="/">
                <img
                  src={brandLogo}
                  alt="Brand logo"
                  width="20%"
                  height="auto"
                />
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Login/>
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
                textTransform:"uppercase"
              }}
            >
              {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
              {pages.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <>
                      <div className="menu">
                        {/* <div className={`menu_item ${isMenuOpen ?"activemenu":"" }`}> */}
                        <div className="icon">{route.icon}</div>
                        {/* <AnimatePresence> */}
                        {
                          <div
                            // variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="link_text"
                          >
                            {route.name}
                          </div>
                        }
                        {/* </AnimatePresence> */}
                        {/* </div> */}
                        {/* {isOpen && ( */}
                        <div
                        // animate={
                        // isMenuOpen
                        //   ? {
                        //       rotate: -90,
                        //     }
                        //   : { rotate: 0 }
                        // }
                        // className={`icon ${isMenuOpen ?"activemenu":""}`}
                        >
                          {/* <FaAngleDown /> */}
                        </div>
                        {/* )} */}
                      </div>{" "}
                      {/* <AnimatePresence> */}
                      {/* {isMenuOpen && ( */}
                      <div
                        // variants={menuAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="menu_container"
                      >
                        {route.subRoutes.map((subRoute, index) => (
                          <div
                            // variants={menuItemAnimation}
                            key={index}
                            // custom={index}
                          >
                            <NavLink to={subRoute.path} className="link">
                              <div className="icon">{subRoute.icon}</div>
                              <div className="link_text">{subRoute.name}</div>
                            </NavLink>
                          </div>
                        ))}
                      </div>
                      {/* )}{" "} */}
                      {/* </AnimatePresence> */}
                    </>
                  );
                }
                return (
                  <NavLink to={route.path} key={index} className="link">
                    <div className="icon">{route.icon}</div>
                    {/* <AnimatePresence> */}
                    {/* {isOpen && ( */}
                    <div
                      // variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </div>
                    {/* )} */}
                    {/* </AnimatePresence> */}
                  </NavLink>
                );
              })}
              
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {/* <Tooltip title="Login"> */}
                {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                  <Login/>
                {/* </IconButton> */}
              {/* </Tooltip> */}
              {/* <Menu
                sx={{ mt: "45px" }}
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl ">{children}</Container>
    </>
  );
}
export default Navbar;
