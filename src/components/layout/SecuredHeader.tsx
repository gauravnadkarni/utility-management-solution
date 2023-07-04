import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import StoreIcon from '@mui/icons-material/Store';
import { Avatar, Tooltip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;


export type SecuredHeaderProps = {
  settings: Array<{
    title:string
    key:string
    handleOnClick:(event: React.MouseEvent<HTMLElement>)=> void
  }>,
  profileMenuHandlers: {
    handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>)=> void
    handleCloseUserMenu: () => void
    menuAnchor: HTMLElement | null
  },
  drawerHandlers?: {
    handleOpenDrawer?:(e:React.MouseEvent<HTMLElement>)=>void,
    handleCloseDrawer?:(e:React.MouseEvent<HTMLElement>)=>void,
  },
  mainSideBarMenus: Array<{
    title:string
    key:string
    handleOnClick:(e:React.MouseEvent<HTMLElement>)=>void
    icon: React.ReactNode
  }>,
  otherSideBarMenus: Array<{
    title:string
    key:string
    handleOnClick:(e:React.MouseEvent<HTMLElement>)=>void
    icon: React.ReactNode
  }>,
  userInfo: {
    isSignedIn: boolean
    avatar:string
  },
  appHeaderTitle?:string,
  settingsTooltipTitle?:string
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MenuComponent(props:React.PropsWithChildren<SecuredHeaderProps>) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const {settings, profileMenuHandlers: {
    handleCloseUserMenu,
    handleOpenUserMenu,
    menuAnchor,
    },
    drawerHandlers: {
      handleOpenDrawer=(e:React.MouseEvent<HTMLElement>)=>{},
      handleCloseDrawer=(e:React.MouseEvent<HTMLElement>)=>{},
    } = {

    }, userInfo: { 
      isSignedIn,
      avatar
    }, appHeaderTitle, settingsTooltipTitle,
    mainSideBarMenus,
    otherSideBarMenus
  } = props;

  const handleDrawerOpen = (e:React.MouseEvent<HTMLElement>) => {
    setOpen(true);
    handleOpenDrawer(e);
  };

  const handleDrawerClose = (e:React.MouseEvent<HTMLElement>) => {
    setOpen(false);
    handleCloseDrawer(e);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            { appHeaderTitle || "Admin Store" } 
          </Typography>
          <StoreIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            { appHeaderTitle || "Admin Store" } 
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>

          { isSignedIn && 
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={settingsTooltipTitle ||  "Open settings"}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={menuAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(menuAnchor)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.key} onClick={setting.handleOnClick}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
                  }
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {mainSideBarMenus.map((sideBarMenuObject, index) => (
            <ListItem key={sideBarMenuObject.key} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={sideBarMenuObject.handleOnClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {sideBarMenuObject.icon}
                </ListItemIcon>
                <ListItemText primary={sideBarMenuObject.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {otherSideBarMenus.map((sideBarMenuObject, index) => (
            <ListItem key={sideBarMenuObject.key} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={sideBarMenuObject.handleOnClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {sideBarMenuObject.icon}
                </ListItemIcon>
                <ListItemText primary={sideBarMenuObject.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
                </ListItem>
          ))}
                </List>
      </Drawer>
    </React.Fragment>
  );
}