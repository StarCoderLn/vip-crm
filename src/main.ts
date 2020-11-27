import { createApp } from 'vue';
import {
  Button,
  Form,
  Input,
  Layout,
  Menu,
  Table,
  Spin,
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueHighcharts from '@/directive/highcharts';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './index.css';

const antdComponents = [
  Button,
  Form,
  Input,
  Layout,
  Menu,
  Table,
  Spin,
];
const app = createApp(App);

antdComponents.map((item) => app.use(item));
app
  .use(VueHighcharts)
  .use(store)
  .use(router)
  .mount('#app');
