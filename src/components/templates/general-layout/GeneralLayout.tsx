import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useIsFetching } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes } from "src/constants/routes";
import { Texts } from "src/constants/texts";
import { useAuthContext } from "src/context/auth";
import { NavBar } from "./nav-bar";
import { DrawerHeader, SideBar } from "./side-bar";

import { ReactComponent as HomeIcon } from "src/assets/icons/sidebar/home.svg";

type Props = {
  children?: React.ReactNode;
  noPadding?: boolean;
};

const AdminNavItems = [
  {
    Icon: HomeOutlinedIcon,
    name: Texts.general.home,
    link: Routes.Home,
  },
];

const NavbarItems = [
  {
    Icon: HomeIcon,
    name: Texts.general.home,
    link: Routes.Home,
  },
];

export const GeneralLayout = ({ children, noPadding }: Props) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const isFetching = useIsFetching();

  const authContext = useAuthContext();

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleNavItemClick = useCallback(
    (link: string) => () => {
      navigate(link);
    },
    []
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar drawerOpen={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar
        drawerOpen={open}
        handleDrawerClose={handleDrawerClose}
        handleNavItemClick={handleNavItemClick}
        navItems={
          authContext.user?.role === "USER" ? NavbarItems : AdminNavItems
        }
      />
      <Box component="main" sx={{ flexGrow: 1, p: noPadding ? 0 : 3 }}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <DrawerHeader />
        {isFetching > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <CircularProgress size={60} sx={{ color: "#5364FF" }} />
            <Typography variant="body1">{Texts.general.dataLoading}</Typography>
          </Box>
        ) : (
          children
        )}
        <ToastContainer />
      </Box>
    </Box>
  );
};
