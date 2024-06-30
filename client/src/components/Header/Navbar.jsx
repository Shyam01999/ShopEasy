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
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import brandLogo from "../.././images/shopeasy_logo.png";
import Login from "../Authentication/Login/Login";
import { FaShoppingCart } from "react-icons/fa";
import MetaData from "../../constant/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/auth.actions";
import { Badge } from "@mui/material";

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
const settings = ["Profile", "Logout"];

function Navbar({ children }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { userData, token } = useSelector((state) => state.authManager);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <>
      <MetaData title="ShopEasy Home" />
      <AppBar position="sticky" className="header-container">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ flexGrow: 1 }}>
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

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "flex" },
                justifyContent: "end",
                textTransform: "uppercase",
              }}
            >
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
                    <Badge badgeContent={1} color="error">
                      <div className="icon" sx={{ fontSize: 5 }}>
                        {route.icon}
                      </div>
                    </Badge>

                    {/* <div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </div> */}
                  </NavLink>
                );
              })}
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "flex", md: "flex" },
                marginLeft: 1,
                marginInline: 2,
                color: "#646cff",
              }}
            >
              {token ? (
                <>
                  <Box sx={{ flexGrow: 1, margin: "auto" }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "4rem" }}
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
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          p: 1,
                        }}
                      >
                        <IconButton sx={{ p: 0 }}>
                          <Avatar alt="" src="/static/images/avatar/2.jpg" sx={{ width:60, height: 60 }}/>
                        </IconButton>
                        <span>{userData.username}</span>{" "}
                        {settings.map((setting) => (
                          <MenuItem
                            key={setting}
                            onClick={
                              setting === "Logout"
                                ? handleLogout
                                : handleCloseUserMenu
                            }
                          >
                            <Typography textAlign="center">
                              {setting}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Box>
                    </Menu>
                  </Box>
                </>
              ) : (
                <Login />
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
