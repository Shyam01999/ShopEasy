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
import brandLogo from "../.././images/shopeasy_logo.webp";
import Login from "../Authentication/Login/Login";
import { FaShoppingCart } from "react-icons/fa";
import MetaData from "../../constant/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/auth.actions";
import { Badge, InputBase, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MdLogin } from "react-icons/md";

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  left: "-5rem",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "var(--white-color)",
  borderRadius: "2rem",
  color: "var(--text-color)",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Navbar({ children }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchvalue, setSearchValue] = React.useState("");

  const { userData, token } = useSelector((state) => state.userDataReducer);
  console.log("userdata", userData)
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
      <AppBar position="sticky" sx={{ background: "var(--header-color)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ width: "100%" }}>
              <Link to="/">
                <img
                  src={brandLogo}
                  alt="Brand logo"
                  width="25%"
                  height="auto"
                />
              </Link>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Search className="search-container" sx={{ left: "0rem" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  onChange={(e) => setSearchValue(e.target.value)}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", md: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "1rem",
                marginLeft: 1,
                marginInline: 2,
                color: "#646cff",
                width: "100%",
              }}
            >
              {token ? (
                <>
                  <Box>
                    {token &&
                      pages.map((route, index) => {
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
                                    <NavLink
                                      to={subRoute.path}
                                      className="link"
                                    >
                                      <div className="icon">
                                        {subRoute.icon}
                                      </div>
                                      <div className="link_text">
                                        {subRoute.name}
                                      </div>
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
                  <Box>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="" src={`${userData.avatar.url}` || "/static/images/avatar/2.jpg"} />
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
                          <Avatar
                            alt=""
                            src={`${userData.avatar.url}` || "/static/images/avatar/2.jpg"}
                            sx={{ width: 60, height: 60 }}
                          />
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
                <Box sx={{}}>
                  <Tooltip title="Login">
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<MdLogin />}
                    >
                      <Link to="/login" className="headerBtn">
                        Login
                      </Link>
                    </Button>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
