import {
  defineComponent,
  PropType,
  ref,
  Ref,
  toRefs,
  watch,
  onMounted,
  onUnmounted,
  h,
} from 'vue';
import Highcharts, { Options, Chart } from 'highcharts';
import { hasKey } from '@/utils';

const VueHighCharts = defineComponent({
  name: 'VueHighcharts', // 注意这里的名字要跟使用该组件时的名字一样才行！现在的名字使用的时候就是：vue-highcharts
  props: {
    type: { // 图表类型
      type: String as PropType<keyof typeof Highcharts>,
      default: 'chart',
    },
    options: { // 配置选项
      type: Object as PropType<Options>,
      required: true,
    },
    redrawOnUpdate: { // 是否在更新图表后进行重绘操作
      type: Boolean,
      default: true,
    },
    oneToOneUpdate: {
      type: Boolean,
      default: false,
    },
    animateOnUpdate: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const chartRef = ref(null);
    const chart: Ref<null | Chart> = ref(null);
    const { options } = toRefs(props);
    if (options?.value && hasKey(Highcharts, props.type)) {
      watch(
        options,
        (newValue) => {
          if (chart.value !== null) {
            ((chart as unknown) as Ref<Chart>).value.update(
              newValue,
              props.redrawOnUpdate,
              props.oneToOneUpdate,
              props.animateOnUpdate,
            );
            emit('updated');
          }
        },
        { deep: true },
      );
      onMounted(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        chart.value = (Highcharts as any)[props.type](chartRef.value, options.value, () => {
          emit('rendered');
        });
      });
      onUnmounted(() => {
        if (chart?.value) {
          ((chart as unknown) as Ref<Chart>).value.destroy();
        }
        emit('destroyed');
      });
    } else if (!props.options) {
      console.warn('The "options" parameter is required.');
    } else {
      console.warn(`${props.type} is not a valid highcharts type or has not been imported`);
    }
    return {
      chartRef,
      chart,
    };
  },

  render() {
    return h('div', {
      class: 'vue-highcharts',
      ref: 'chartRef',
    });
  },
});

export default VueHighCharts;
