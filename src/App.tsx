import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { PageLayout } from './conponents/shared/PageLayout';
import Router from './Router';
import globalStyles from './styles/globalStyles';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <Global styles={globalStyles} />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <PageLayout>
            <Router />
          </PageLayout>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
