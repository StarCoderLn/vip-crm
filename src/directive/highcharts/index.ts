import { Plugin, App } from 'vue';
import VueHighCharts from './vue-highcharts';

const install = (app: App) => {
  console.log(VueHighCharts.name);
  app.component(VueHighCharts.name, VueHighCharts);
};

VueHighCharts.install = install;

export default VueHighCharts as unknown as Plugin;
