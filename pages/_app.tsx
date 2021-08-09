import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import Head from 'next/head';
import 'styles/core.scss';
import '@tensorflow/tfjs-backend-webgl';

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Clips</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta property="og:title" content="Clips" key="page_title" />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}
export default App;
