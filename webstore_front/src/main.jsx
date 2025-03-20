import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from 'react-toastify'
import { store } from "./store";
import { Provider } from 'react-redux'
import { signInByToken } from "./store/reducers/authReducer/actions"
import { ShoppingProvider } from './context/ShoppingContext';
if (localStorage.auth && localStorage.urt) {
  signInByToken({
    auth: localStorage.auth,
    urt: localStorage.urt,
  })(store.dispatch);
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="light"
    />
      <ShoppingProvider>
          <Provider store={store}>
              <App />
          </Provider>
      </ShoppingProvider>
    
  </StrictMode>,
)
