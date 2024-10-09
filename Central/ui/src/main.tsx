import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css'
import {
  BrowserRouter
} from "react-router-dom";
import './i18n/config';
import queryClient from './config/reactQuery';
import {QueryClientProvider} from '@tanstack/react-query';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
