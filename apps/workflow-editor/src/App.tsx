import { WorkflowEditor } from './components/WorkflowEditor';
import './App.css';

function App() {
  const handleSave = (definition: any) => {
    console.log('Saving workflow:', definition);
    // TODO: Implement save via API
  };

  const handleLoad = async () => {
    // TODO: Implement load via API
    return null;
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <WorkflowEditor onSave={handleSave} onLoad={handleLoad} />
    </div>
  );
}

export default App;
