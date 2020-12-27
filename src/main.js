import Vue from "vue";
import App from "./App";

// import VueZoom from "../dist/zoom.common";
// import "../dist/zoom.css";
import VueZoom from "./components";
Vue.use(VueZoom);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
