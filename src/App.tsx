import { Content } from '@carbon/react';
import AppHeader from './components/AppHeader';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <>
      <AppHeader />
      <Content id="main-content" className="content-with-rail">
        <KanbanBoard />
      </Content>
    </>
  );
}

export default App;

