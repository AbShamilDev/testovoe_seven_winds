import { createRoot } from "react-dom/client";
import { App } from "./App";
import { makeStore } from "./redux/store";
import StoreProvider from "./redux/StoreProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
