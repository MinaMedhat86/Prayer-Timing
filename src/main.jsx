
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";


import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { I18nextProvider } from "react-i18next";
import i18n from './i18n.js'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById("root")
);