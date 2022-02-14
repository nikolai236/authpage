import React from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  Outlet,
} from 'react-router-dom';
import Async from 'react-promise';
import { AuthProvider, useAuth } from "./components/AuthProvider";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function PrivateRoute (props) {
  const { user, loadingInit } = useAuth();
  console.log(loadingInit);

  if(loadingInit) {
    return <p>loading</p>
  } else {
  if(!user) return <Navigate to='/register' />

  return <Outlet />

  }
}

function App() {
  return (
    <Router>
      <AuthProvider >
          <Routes>
            <Route exact path="/" element={<PrivateRoute />} > 
              <Route exact path="/" element={<Home />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
      </AuthProvider>
  </Router>
  );
}

export default App;
