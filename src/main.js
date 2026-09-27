import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import reveal from "./directives/reveal";
import magnetic from "./directives/magnetic";
import { asset } from "./lib/assets";
import "./styles.css";
import './home.css';

const app = createApp(App);
app.config.globalProperties.$asset = asset;
app.use(router);
app.directive("reveal", reveal);
app.directive("magnetic", magnetic);
app.mount("#app");
