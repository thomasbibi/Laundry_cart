import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import React from "react";
import Register from "./sign-up/Register";
import SignInPage from "./sign-in/SignInPage";
import CreateOrder from "./createOrder/CreateOrder";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<SignInPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="create-order" element = {<CreateOrder/>}/>
        </Routes>
      </BrowserRouter>
 
    </>
  );
}

export default App;
