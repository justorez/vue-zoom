import VueZoom from "./zoom";

function install(Vue) {
    if (install.installed) {
        return;
    }

    install.installed = true;
    Vue.component(VueZoom.name, VueZoom);
}

VueZoom.install = install;

if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(VueZoom);
}

export default VueZoom;
