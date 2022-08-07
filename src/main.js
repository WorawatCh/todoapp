import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap";
import axios from "axios";
import setAuthHeader from "./utils/setAuthHeader";

if (localStorage.jwtToken) {
  setAuthHeader(localStorage.jwtToken);
} else {
  setAuthHeader(false);
}

createApp(App).use(router).mount("#app");
