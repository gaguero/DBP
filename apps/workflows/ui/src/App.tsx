import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Workflows - EspoCRM
        </h1>
        <p className="text-gray-600 mb-8">
          Aplicación externa para gestión de workflows
        </p>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Estado</h2>
          <p className="text-gray-700">
            La aplicación está en desarrollo. El editor visual y las funcionalidades
            principales se implementarán en las siguientes fases.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

