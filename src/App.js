// import "./App.css";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/layout/Main';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <Router>
        <Main />
      </Router>
    </div>
  );
}
export default App;
