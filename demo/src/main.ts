import { createApp } from 'vue';
import App from './App.vue';
import ResponsiveVisibility from 'vue-responsive-visibility';

const app = createApp(App);
app.use(ResponsiveVisibility);
app.mount('#app');
