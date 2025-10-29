
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router/Routes.tsx'
import { RouterProvider } from 'react-router'
import { CartContextProvider } from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  
    <CartContextProvider>
        <RouterProvider router={router} />
    </CartContextProvider>
)
