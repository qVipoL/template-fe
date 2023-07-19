import MenuIcon from "@mui/icons-material/Menu";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { Box, IconButton, Toolbar, styled, useTheme } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { drawerWidth } from "../const";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: theme.topBar.primary,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type Props = {
  drawerOpen: boolean;
  handleDrawerOpen: () => void;
};

export const NavBar = ({ drawerOpen, handleDrawerOpen }: Props) => {
  const theme = useTheme();

  return (
    <AppBar position="fixed" open={drawerOpen} sx={{ py: 0.6 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(drawerOpen && { display: "none" }),
          }}
        >
          <MenuIcon sx={{ color: theme.icon.secondary, fontSize: 35 }} />
        </IconButton>
        <Box sx={{ ml: "auto" }}>
          <IconButton aria-label="add to shopping cart">
            <SettingsOutlinedIcon sx={{ color: theme.icon.secondary }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
