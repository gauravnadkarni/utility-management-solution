import { AppProps } from 'next/app';
import MainContainer from './MainContainer';
import Header from './Header';
import classes from './Layout.module.css';


interface Props {
    children: React.ReactNode
}

function Layout(props:Props) {
  return (
    <div>
      <Header />
      <MainContainer>
        <main className={classes.main}>{props.children}</main>
      </MainContainer>
    </div>
  );
}

export default Layout;