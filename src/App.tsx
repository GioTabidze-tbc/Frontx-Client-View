import { Content } from '@carbon/react';
import AppHeader from './components/AppHeader';
import MainContent from './components/MainContent';

function App() {
  return (
    <>
      <AppHeader />
      <Content id="main-content" className="content-with-rail">
        <MainContent />
      </Content>
    </>
  );
}

export default App;

