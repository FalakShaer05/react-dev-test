import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MainButtons from './components/MainButton';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'; // Import Routes
import './styles/main.scss'
import ModalA from './components/ModalA';
import ModalB from './components/ModalB';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    
      <Router>
        {/* <Provider store={store}> */}
        {/* <div className="app"> */}
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/modalA" element={<ModalA />} /> {/* Use element prop */}
            <Route path="/modalB" element={<ModalB />} /> {/* Use element prop */}
            <Route path="/" element={<MainButtons />} /> {/* Use element prop */}
          </Routes>
        {/* </div> */}
      </Router>
    // </Provider>
  );
}

export default App;
