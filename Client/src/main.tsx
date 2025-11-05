import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router/Routes.tsx'
import { RouterProvider } from 'react-router'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
