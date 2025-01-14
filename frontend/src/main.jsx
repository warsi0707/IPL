import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RecoilRoot>
    <div className="bg-gray-200 h-auto">
      <App />
    </div>
  </RecoilRoot>
  // </StrictMode>,
);
