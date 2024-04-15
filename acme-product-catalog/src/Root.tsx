import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";
// import "@acme/acme-ds/dist/style.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Root: React.FC = (props: any) => {
  return (
    <BrowserRouter>
      <App {...props} />
    </BrowserRouter>
  );
};
