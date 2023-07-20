import ReactDOM from "react-dom/client";
import renderRouter from "./router";

import "./global.less";
import "./scroll.less";

import "./utils/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(renderRouter())
