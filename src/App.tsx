import { Content } from '@carbon/react';
import AppHeader from './components/AppHeader';
import MainContent from './components/MainContent';

function App() {
  return (
    <>
      <AppHeader />
      <Content id="main-content">
        <MainContent />
      </Content>
    </>
  );
}

export default App;

