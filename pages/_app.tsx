import React from 'react';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme,
  CSSResetProps,
} from '@chakra-ui/core';
import { APP_TITLE } from '@/constants';
import { DefaultSeoProps, DefaultSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';

const getDefaultSeoConfig = (pathname: string): DefaultSeoProps => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}${pathname}`;
  const title = APP_TITLE;
  const description = `${APP_TITLE} is a URL shortener which makes it easy to shorten and share your short URLs.`;
  return {
    title,
    canonical: url,
    description,
    openGraph: {
      url,
      title,
      type: 'website',
      description,
      // eslint-disable-next-line @typescript-eslint/camelcase
      site_name: APP_TITLE,
      images: [
        {
          url: `${baseUrl}/logo_400.png`,
          height: 400,
          width: 400,
          alt: 'OnURL large logo',
        },
        {
          url: `${baseUrl}/logo_200.png`,
          height: 200,
          width: 200,
          alt: 'OnURL medium logo',
        },
        {
          url: `${baseUrl}/logo_80.png`,
          height: 80,
          width: 80,
          alt: 'OnURL small logo',
        },
      ],
    },
    additionalMetaTags: [
      { name: 'application-name', content: title },
      { property: 'dc:creator', content: 'Onur Önder' },
    ],
  };
};

const getCSSResetConfig: CSSResetProps['config'] = (theme, defaultConfig) => {
  const { colors } = theme;
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...defaultConfig!,
    light: {
      bg: colors.twitter[200],
      borderColor: colors.purple[200],
      color: colors.black[800],
      placeholderColor: colors.purple[200],
    },
  };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <>
      <DefaultSeo {...getDefaultSeoConfig(router.pathname)} />
      <ThemeProvider theme={theme}>
        <ColorModeProvider value="light">
          <CSSReset config={getCSSResetConfig} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;