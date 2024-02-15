import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";

import "./index.css";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

const token = sessionStorage.getItem("token");
axios.defaults.baseURL = "https://xodim.pythonanywhere.com";
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
);
