import React from "react";
import ReactXnft, { AnchorDom } from "react-xnft";
import { App } from "./App";

declare global {
  interface Window {
    xnft: any;
  }
}

ReactXnft.render(
  <AnchorDom>
    <App />
  </AnchorDom>
);
