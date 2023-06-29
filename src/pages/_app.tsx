import { AppProps } from 'next/app';
import { FC } from "react";
import { CacheProvider } from '@emotion/react';
import '../../styles/globals.css';
import Layout from '../components/layout/Layout';
import {wrapper} from '../store';
import { Provider } from 'react-redux';
import createEmotionCache from '../cache';





const clientSideEmotionCache = createEmotionCache();

const App: FC<AppProps> = ({Component, ...rest}: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { emotionCache = clientSideEmotionCache, pageProps } = props;
    return  <Provider store={store}>
                <CacheProvider value={emotionCache}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </CacheProvider>
            </Provider>
          
}

export default App