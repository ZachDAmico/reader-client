import ReactDOM from "react-dom/client";
import { ApplicationViews } from "./components/ApplicationViews";
import { BrowserRouter } from "react-router-dom";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ApplicationViews />
  </BrowserRouter>
);
