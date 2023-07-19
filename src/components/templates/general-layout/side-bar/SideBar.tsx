import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  styled,
  useTheme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import instaBotImg from "src/assets/images/instabot.png";
import { Routes } from "src/constants/routes";
import { Texts } from "src/constants/texts";
import { useAuthContext } from "src/context/auth";
import { ConfirmModal } from "../../confirm-modal";
import { drawerWidth } from "../const";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

type NavItem = {
  Icon: any;
  name: string;
  link: string;
  disabled?: boolean;
};

type Props = {
  drawerOpen: boolean;
  handleDrawerClose: () => void;
  navItems: NavItem[];
  handleNavItemClick: (link: string) => () => void;
};

export const SideBar = ({
  drawerOpen,
  handleDrawerClose,
  navItems,
  handleNavItemClick,
}: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutClick = useCallback(() => {
    setLogoutModalOpen(true);
  }, []);

  const handleLogoutModalClose = () => {
    setLogoutModalOpen(false);
  };

  const handleLogout = () => {
    authContext.logoutUser();
    navigate(Routes.Login);
  };

  return (
    <Drawer
      variant="permanent"
      open={drawerOpen}
      PaperProps={{ sx: { backgroundColor: theme.general.surface } }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon sx={{ color: theme.icon.primary, fontSize: 35 }} />
        </IconButton>
      </DrawerHeader>
      {drawerOpen && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img style={{ maxWidth: "130px" }} src={instaBotImg} />
          </Box>
          <Divider
            sx={{
              width: "75%",
              mx: "auto",
              my: 3,
              borderColor: theme.general.sideBarText,
            }}
          />
        </>
      )}
      <List>
        {navItems.map(({ Icon, name, link, disabled }) => (
          <ListItem
            key={name}
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 0,
            }}
            onClick={handleNavItemClick(link)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? "initial" : "center",
                px: drawerOpen ? 3 : 4,
                borderRadius: 5,
              }}
              disabled={disabled}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 4 : "auto",
                  justifyContent: "center",
                }}
              >
                <Icon sx={{ color: theme.icon.primary, fontSize: 35 }} />
              </ListItemIcon>
              <ListItemText
                primary={name}
                primaryTypographyProps={{ fontSize: 30 }}
                sx={{
                  opacity: drawerOpen ? 1 : 0,
                  color: theme.general.sideBarText,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: drawerOpen ? 65 : 85,
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: drawerOpen ? "initial" : "center",
              px: drawerOpen ? 3 : 4,
              borderRadius: 5,
            }}
            onClick={handleLogoutClick}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 4 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutIcon sx={{ color: theme.icon.primary, fontSize: 35 }} />
            </ListItemIcon>
            <ListItemText
              primary={Texts.general.logout}
              primaryTypographyProps={{ fontSize: 30 }}
              sx={{
                opacity: drawerOpen ? 1 : 0,
                color: theme.general.sideBarText,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <ConfirmModal
        text={Texts.general.logoutQuestion}
        cancelText={Texts.general.preferToStay}
        confirmText={Texts.general.disconnect}
        open={logoutModalOpen}
        onConfirm={handleLogout}
        onClose={handleLogoutModalClose}
      />
    </Drawer>
  );
};
