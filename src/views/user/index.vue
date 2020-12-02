<template>
  <div style="height:100%;">
    <a-form
      :model="formData"
      layout="inline"
      ref="loginForm">
      <a-form-item
        label="姓名："
        name="name">
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item
        label="电话号码："
        name="phone">
        <a-input v-model:value="formData.phone" />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          @click="search">
          查询
        </a-button>
        <a-button
          @click="reset"
          style="margin-left: 10px;">
          重置
        </a-button>
      </a-form-item>
    </a-form>
    <router-link to="/add">
      <a-button
        type="primary"
        style="margin: 20px 0;">
        新增
      </a-button>
    </router-link>
    <a-table
      :columns="columns"
      :data-source="tableData"
      rowKey="id"
      :loading="loading"
      size="middle">
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #action="{}">
        <span>
          <a>编辑</a>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'User',
  setup() {
    const { state, dispatch } = useStore();
    const data = reactive({
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '工作经验（年）',
          dataIndex: 'worktime',
          key: 'worktime',
        },
        {
          title: '电话号码',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '城市',
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
          title: '操作',
          key: 'action',
          slots: { customRender: 'action' },
        },
      ],
      tableData: computed(() => state.user.tableData),
      formData: {
        name: '',
        phone: '',
      },
      loading: computed(() => state.user.loading),
    });

    const search = () => {
      dispatch('user/getUserList', data.formData);
    };

    const reset = () => {
      data.formData.name = '';
      data.formData.phone = '';
    };

    return {
      ...toRefs(data),
      search,
      reset,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
