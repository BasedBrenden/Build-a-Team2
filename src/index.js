import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';

import StartPage from './StartPage';
import HomePage from './components/HomePage';
import SignUpForm from './components/SignUpPage';
import LogInForm from './components/LogInPage';

import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element={<StartPage/>}/>
      <Route path = "*" element={<StartPage/>}/>
      <Route path ="/Home" element={<HomePage/>}/>
      <Route path ="/sign-up" element={<SignUpForm/>}/>
      <Route path ="/log-in" element={<LogInForm/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
