import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignUpForm from './components/Nav/LogIn/SignUpPage';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import LogInForm from './components/Nav/LogIn/LogInPage';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAwIVM34CSefM9DoaHEEYc_koEndy2VNh0",

  authDomain: "battest-be17d.firebaseapp.com",

  projectId: "battest-be17d",

  storageBucket: "battest-be17d.appspot.com",

  messagingSenderId: "436395671464",

  appId: "1:436395671464:web:15ae73b0ffbc8670ee679d",

  measurementId: "G-PD5SCY0JY1"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);







ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path ="/" element={<App/>}/>
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
