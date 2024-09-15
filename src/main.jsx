import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { loader as Productsloader } from './pages/Products.jsx'
import { action as registerAction } from './pages/Register.jsx'
import NewProduct,{ action as newProductAction} from './pages/NewProduct.jsx'
import {action as loginAction} from './pages/Login.jsx'
import { DashboardLayout } from './components/Dashboardlayout.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Products from './pages/Products.jsx'
import ProductDetail,{ loader as productDetailLoader, action as productDetailAction,} from './pages/ProductDetail.jsx'

const router = createBrowserRouter ([
  {
    path:"/",
    element:<App />
  },
  {
    path:"/login",
    action: loginAction,
    element: 
      <AuthProvider>
        <Login/>
      </AuthProvider>
  },
  {
    path:"/register",
    action: registerAction,
    element:<Register/>
  },
  {
    path:"/products",
    element: (
      <AuthProvider>
        <DashboardLayout />
      </AuthProvider>
    ),
    children:[   
      {
        index: true,
        loader: Productsloader,
        element: <Products/>,
      },
      {
        path:"new",
        element:<NewProduct/>,
        action: newProductAction
      },
      {
        path:"productId",
        element: <ProductDetail/>,
        loader: productDetailLoader,
        action: productDetailAction,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <RouterProvider router={router}/>
    
  </StrictMode>,
)
