import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importing pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';

//main app component  
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
