import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Index } from '../../pages/index'
import { NotFound404 } from '../../pages/notFound404/notFound404'
import Login from '../../pages/login/login'
import Register from '../../pages/register/register'
import EmailInput from '../../pages/forgotPassword/emailInput/emailInput'
import Profile from '../../pages/profile/profile'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forgot-password" element={<EmailInput />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/ingredients/:id" element={<NotFound404 />}/>
        {/*  URL для Step-2  */}
        {/*<Route path="/feed" element={<NotFound404 />}/> */}
        {/*<Route path="/orders" element={<NotFound404 />}/>*/}
        {/* ----------------- */}
        <Route path="/" element={<Index />}/>
        <Route path="*" element={<NotFound404 />}/>
      </Routes>
    </Router>
  )
}
