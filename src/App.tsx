import { Global } from '@emotion/react';
import Navigation from './conponents/shared/Navigation';
import { PageLayout } from './conponents/shared/PageLayout';
import Router from './Router';
import globalStyles from './styles/globalStyles';

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <PageLayout>
        <Router />
      </PageLayout>
    </>
  );
}

export default App;
