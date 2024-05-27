import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from "react-auth-kit";
import {store} from "./store.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider store={store}>
          <App />
      </AuthProvider>
  </React.StrictMode>,
)
