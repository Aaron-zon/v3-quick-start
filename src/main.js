// core
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import '@/router/permission';
// load
import { loadPlugins } from '@/plugins';
import { loadSvg } from '@/icons/index.js';
import { loadDirectives } from "@/directives";

// css
import 'normalize.css';
import './styles/index.scss';
import 'element-plus/dist/index.css';

const app = createApp(App);

/** load plugins */
loadPlugins(app);
/** load svg */
loadSvg(app);
/** load directives */
loadDirectives(app);

app.use(store).use(router).mount('#app');

export default app;