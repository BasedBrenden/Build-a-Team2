import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignUpForm from './components/Nav/LogIn/SignUpPage';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import LogInForm from './components/Nav/LogIn/LogInPage';
import AccountPage from './components/AccountPage';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path ="/" element={<App/>}/>
      <Route path ="/sign-up" element={<SignUpForm/>}/>
      <Route path ="/log-in" element={<LogInForm/>}/>
      <Route path ="/account" element={<AccountPage/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
