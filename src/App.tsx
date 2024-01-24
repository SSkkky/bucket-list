import Home from './pages/Home';
import Write from './pages/Write';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/write' element={<Write />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
