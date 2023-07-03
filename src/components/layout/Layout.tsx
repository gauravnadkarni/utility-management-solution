import { AppProps } from 'next/app';
import MainContainer from './MainContainer';
import Header, { HeaderProps } from './Header';
import classes from './Layout.module.css';
import { PropsWithChildren, useState } from 'react';
import { 
  selectUser,
} from "../auth/store/auth-slice";
import { useAppSelector } from '../../hooks';

function Layout(props:PropsWithChildren) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const selectUserState:{userId:number} = useAppSelector(selectUser);

  const headerProps:HeaderProps = {
    settings:[{
        title: 'Profile',
        key: 'profile'
      },{
        title: 'Account',
        key: 'account'
      },{
        title: 'Dashboard',
        key: 'dashboard'
      },{
        title: 'Logout',
        key: 'logout'
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
  };

  return (
    <div>
      <Header {...headerProps}/>
      <MainContainer>
        <main className={classes.main}>{props.children}</main>
      </MainContainer>
    </div>
  );
}

export default Layout;