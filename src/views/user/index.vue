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
    <a-button
      type="primary"
      class="mt20 mb20"
      @click="addUser">
      新增
    </a-button>
    <a-table
      :columns="columns"
      :data-source="tableData"
      rowKey="id"
      :loading="loading"
      size="middle">
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #worktime="{ text }">
        <span>{{ text }}年</span>
      </template>
      <template #action="{ record }">
        <a-button
          type="primary"
          size="small"
          @click="editUser(record.id)">编辑</a-button>
        <a-button
          type="danger"
          size="small"
          class="ml20"
          @click="deleteUser(record.id)">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  createVNode,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Modal, message } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import axios from 'axios';

export default defineComponent({
  name: 'User',
  setup() {
    const router = useRouter();
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
          title: '工作经验',
          dataIndex: 'worktime',
          key: 'worktime',
          slots: { customRender: 'worktime' },
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

    onMounted(() => {
      dispatch('user/getUserList', data.formData);
    });

    // 查询
    const search = () => {
      dispatch('user/getUserList', data.formData);
    };

    // 重置
    const reset = () => {
      data.formData.name = '';
      data.formData.phone = '';
    };

    // 新增
    const addUser = () => {
      router.push({
        path: '/add',
      });
    };

    // 编辑
    const editUser = (id: string) => {
      router.push({
        path: '/edit',
        query: { id },
      });
    };

    // 删除
    const deleteUser = (id: string) => {
      const params = new FormData();
      params.append('id', id);
      Modal.confirm({
        title: '确定要删除该学生吗？',
        icon: createVNode(ExclamationCircleOutlined),
        content: '注意：删除之后数据无法恢复！',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          data.loading = true;
          axios
            .post('/api/basic/web/index.php?r=user/delete', params)
            .then((res) => {
              data.loading = false;
              if (res.data.code === 200) {
                message.success('删除成功');
              } else {
                message.error('删除失败');
              }
            });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };

    return {
      ...toRefs(data),
      search,
      reset,
      addUser,
      editUser,
      deleteUser,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
