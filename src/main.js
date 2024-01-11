import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/main.css";
import "swiper/css";
import "swiper/css/pagination";
import router from "./router";

const pinia = createPinia(),
  app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
