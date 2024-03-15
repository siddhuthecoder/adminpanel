import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Login from './components/Login'
import ClientDetails from './components/ClientDetails'
import ViewClientPdf from './components/ViewClientPdf'
import PDFViewer from './components/PdfViewer'
import EventDetails from './components/events/EventDetails'
import WorkshopDetails from './components/workshops/WorkShopDetails'
import AddEvent from './components/events/AddEvent'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/clients/:clientId' element={<ClientDetails />} />
      <Route path="/clients/pdf/:pdfUrl" element={<ViewClientPdf />} />
      <Route path="/pdf/:pdfUrl2" element={<PDFViewer />} />
      <Route path="/events/add-event" element={<AddEvent />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="workshops/:id" element={<WorkshopDetails />} />
    </Routes>
  )
}

export default App
