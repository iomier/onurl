import React, { useCallback, useReducer, useState } from 'react';

import UrlShortenerSvg from '../Admin/components/UrlShortenerSvg';

import { Box, InputAdornment, TextField, Typography } from '@material-ui/core';
import { Maybe } from '@/types';
import { ShortUrlData } from '@/api/models/ShortUrl';
import { ServerResponse } from 'http';
import { isServer } from '@/utils';
import axios from 'axios';
import AliasView from '@/views/Alias';

interface State {
  data: Maybe<ShortUrlData>;
  error: Maybe<string>;
}

const initialState: State = {
  data: undefined,
  error: undefined,
};
interface RedirectOptions {
  replace: boolean;
}
const pageRedirect = (
  res: Maybe<ServerResponse>,
  location: string,
  { replace }: RedirectOptions,
) => {
  if (isServer()) {
    // A 301 redirect means that the page has permanently moved to a new location.
    // A 302 redirect means that the move is only temporary. Search engines need
    // to figure out whether to keep the old page, or replace it with the one
    // found at the new location.
    res?.writeHead(301, {
      Location: location,
    });
    res?.end();
  } else {
    // https://nextjs.org/docs/api-reference/next/router
    // You don't need to use Router for external URLs,
    // window.location is better suited for those cases.
    if (replace) {
      window.location.replace(location);
    } else {
      window.location.href = location;
    }
  }
};

const HomeView = () => {
  return (
    <>
      <Box flex={1} height="auto" marginBottom={2}>
        <UrlShortenerSvg />
      </Box>
    </>
  );
};

export default HomeView;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
HomeView.getInitialProps = async ({ res, query }) => {
  pageRedirect(res, 'https://landing.karafsapp.com', { replace: true });
  return {};
};
