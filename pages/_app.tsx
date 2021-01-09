import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { appTitle } from '@/constants';
import { DefaultSeoProps, DefaultSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';
import BaseThemeProvider from '@/components/BaseThemeProvider';
import { Provider } from 'next-auth/client';

import '../src/theme/fonts.css';

const getDefaultSeoConfig = (pathname: string): DefaultSeoProps => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}${pathname}`;
  const title = appTitle;
  const description = `${appTitle} is a URL shortener which makes it easy to shorten and share your short URLs.`;
  return {
    title,
    canonical: url,
    description,
  };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Provider session={pageProps.session}>
        <DefaultSeo {...getDefaultSeoConfig(router.pathname)} />
        <BaseThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BaseThemeProvider>
      </Provider>
    </>
  );
};

export default MyApp;
