import { Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { PageLayout } from './conponents/shared/PageLayout';
import Router from './Router';
import globalStyles from './styles/globalStyles';

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <RecoilRoot>
        <PageLayout>
          <Router />
        </PageLayout>
      </RecoilRoot>
    </>
  );
}

export default App;
