import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";

import SvgIcon from "@jamescoyle/vue-icon";

import router from "./router";
const head = createHead();

import "@/assets/scss/main.scss";

const pinia = createPinia();
const app = createApp(App);

app.component('svg-icon', SvgIcon);

app.use(pinia);
app.use(head);
app.use(router);
app.mount("#app");
