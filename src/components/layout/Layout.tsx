import { AppProps } from 'next/app';
import MainContainer from './MainContainer';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import PublicHeader, { PublicHeaderProps } from './PublicHeader';
import classes from './Layout.module.css';
import { Fragment, PropsWithChildren, useState } from 'react';
import { 
  selectUser,
} from "../auth/store/auth-slice";
import { useAppSelector } from '../../hooks';
import SecuredHeader, { SecuredHeaderProps } from './SecuredHeader';
import { Box } from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


function Layout(props:PropsWithChildren) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const selectUserState:{userId:number} = useAppSelector(selectUser);

  const publicHeaderProps:PublicHeaderProps = {
    
  };

  const securedHeaderProps:SecuredHeaderProps = {
    settings:[{
        title: 'Profile',
        key: 'profile',
        handleOnClick: (e:React.MouseEvent<HTMLElement>) => {console.log('Clicked Profile')},
      },{
        title: 'Account',
        key: 'account',
        handleOnClick: (e:React.MouseEvent<HTMLElement>) => {console.log('Clicked Account')},
      },{
        title: 'Dashboard',
        key: 'dashboard',
        handleOnClick: (e:React.MouseEvent<HTMLElement>) => {console.log('Clicked Dashboard')},
      },{
        title: 'Logout',
        key: 'logout',
        handleOnClick: (e:React.MouseEvent<HTMLElement>) => {console.log('Clicked Logout')},
      },
    ],
    profileMenuHandlers: {
      handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => (setAnchorElUser(event.currentTarget)),
      handleCloseUserMenu: () => (setAnchorElUser(null)),
      menuAnchor: anchorElUser,
    }, 
    userInfo: {
      isSignedIn: selectUserState.userId !== -1 ? true : false,
      avatar: '/static/images/avatar/2.jpg'
    },
    mainSideBarMenus: [{
      title: "Migration",
      key: "migration",
      handleOnClick: (e:React.MouseEvent<HTMLElement>) => {console.log('Clicked Migration')},
      icon: <DriveFileMoveIcon />
    }, {
      title: "Monitor",
      key: "monitor",
      handleOnClick: (e:React.MouseEvent<HTMLElement>) => {console.log('Clicked Monitor')},
      icon: <MonitorHeartIcon />
    }],
    otherSideBarMenus: [{
      title: "Social",
      key: "social",
      handleOnClick: (e:React.MouseEvent<HTMLElement>) => {console.log('Clicked Social')},
      icon: <ConnectWithoutContactIcon />
    }]
  };

  const {isSignedIn} = securedHeaderProps.userInfo;
  return (
    <div>
      { !isSignedIn && <Fragment><PublicHeader {...publicHeaderProps}/>
        <MainContainer>
          <main className={classes.main}>{props.children}</main>
        </MainContainer></Fragment> }
      { isSignedIn && (
        <Box sx={{ display: 'flex' }}>
          <Box component="main" sx={{ flexGrow: 1}}>
            {<SecuredHeader {...securedHeaderProps}/>}
            {<MainContainer>
              <main className={classes.main}>{props.children}</main>
            </MainContainer>}
          </Box>   
        </Box> )}
    </div>
  );
}

export default Layout;