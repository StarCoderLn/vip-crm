<template>
  <div>
    <a-menu
      v-model:selectedKeys="menuConfig.selectedKeys"
      mode="inline"
      theme="dark"
    >
      <a-sub-menu key="sub1">
        <template #title>
          <span>
            <AppstoreOutlined />
            <span>题库世界</span>
          </span>
        </template>
        <a-menu-item key="1">
          <router-link to="">面试真题</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="">每日一题</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span><SettingOutlined /><span>系统配置</span></span>
        </template>
        <a-menu-item key="3">
          <router-link to="/user">学员管理</router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="">课程管理</router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link to="">题库管理</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts">
import {
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'Menu',
  components: {
    AppstoreOutlined,
    SettingOutlined,
  },
  setup() {
    const menuConfig = reactive({
      selectedKeys: ['0'],
    });

    return {
      menuConfig,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
