import React from 'react';
import ReactDOM from 'react-dom/client';
import Helmet from 'react-helmet';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import App from './App';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://3fb4d138494547089aa2785d1e03c4b0@o453369.ingest.sentry.io/6546199',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const container = document.getElementById('root');
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <RecoilRoot>
      <Helmet>
        <title>Debook</title>
        <meta name="description" content="책을 통해 사람들을 찾으세요" />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App data-theme="dark" />
      </QueryClientProvider>
    </RecoilRoot>
  );
} else {
  throw new Error('ElementID root is not defined');
}
