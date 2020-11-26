<template>
  <h1>{{msg}}</h1>
  <h2>{{state.count}}</h2>
  <button @click="increment">add</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props) {
    console.log(props);
    const state = reactive({
      count: 0,
    });
    const increment = () => {
      state.count += 1;
    };
    return {
      state,
      increment,
    };
  },
});
</script>

<style lang="postcss" scoped>
h1 {
  --fontColor: orange;
  color: var(--fontColor);
}
h2 {
  --fontColor: red;
  color: var(--fontColor);
}
button {
  --btnFtColor: #fff;
  --btnBgColor: #178fff;
  --btnFtSize: 18px;
  color: var(--btnFtColor);
  background: var(--btnBgColor);
  font-size: var(--btnFtSize);
  outline: 0;
  border: 0;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
