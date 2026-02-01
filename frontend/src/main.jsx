import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'
import Signup from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Review from './pages/Review.jsx'
import AuthProvider from './components/AuthContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Layout/>}>
      <Route path = "" element={<Review/>}/>
      <Route path = "login" element={<Login/>}/>
      <Route path = "signup" element={<Signup/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router ={router}/>
      </AuthProvider>
  </StrictMode>,
)


// Pages - Dashboard(search,all backend function for it), Review page (landing page for each restaurant-info,recent reviews,review),Login, Signup page 
//    topReviews,totalReviewCount,topRatedRestaurant,worstRatedRestaurant