import { Routes, Route } from 'react-router-dom'
import React, { createContext, useState } from 'react'
import Home from './pages/Home'
import Login from './components/auth/Login'
import ClientDetails from './components/Users/ClientDetails'
import EventDetails from './components/events/EventDetails'
import WorkshopDetails from './components/workshops/WorkShopDetails'
import AddEvent from './components/events/AddEvent'
import AddWorkshops from './components/workshops/AddWorkshops'
import AddNotification from './components/Notification/AddNotification'
import NotificationDetails from './components/Notification/NotificationDetails'
import AddUser from './components/Users/AddUser'

const context = createContext();

function App() {
  const [token,setToken] = useState("");
  const [role,setRole] = useState("");
  const [admin,setAdmin] = useState("")
  return (
    <context.Provider value={{token,setToken,role,setRole,admin,setAdmin}}>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/clients/:clientId' element={<ClientDetails />} />
      <Route path='/clients/add-user' element={<AddUser />} />
      <Route path="/events/add-event" element={<AddEvent />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/workshops/:id" element={<WorkshopDetails />} />
      <Route path="/workshops/add-workshop" element={<AddWorkshops />} />
      <Route path="/notifications/:id" element={<NotificationDetails />} />
      <Route path="/notifications/add-notification" element={<AddNotification />} />
    </Routes>
    </context.Provider>
  )
}

export default App
export {context}