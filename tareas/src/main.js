import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Importa el plugin de Vuetify
import './assets/main.css';

const app = createApp(App);

app.use(vuetify); // Usa Vuetify en la aplicación

app.mount('#app');
