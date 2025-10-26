import './App.css';
import Imageinput from './components/Imageinput';
import Canvas from './components/Canvas';
import { ContextProvider } from './context/appContext';
import Nav from './components/Nav';
import Toaster from './components/Toaster';

function App() {
  return (
    <div className="min-h-screen w-screen bg-gray-100 justify-center items-start" id="app">
      <ContextProvider>
        <Toaster />
        <Nav />
        <div className='container grid grid-flow-row md:grid-flow-col md:grid-cols-2 gap-4 md:gap-8 p-4 m-auto md:m-10'>
        <Imageinput />
        <Canvas />
        </div>
      </ContextProvider>
    </div>
  );
}

export default App;
