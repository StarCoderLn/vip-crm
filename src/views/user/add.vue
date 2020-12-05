<template>
  <div>
    <a-spin
      size="large"
      :spinning="spinning">
      <div class="spin-content">
        <a-form
          :model="formData"
          :rules="rules"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          style="width: 600px;">
          <a-form-item
            label="姓名："
            name="name">
            <a-input v-model:value="formData.name" />
          </a-form-item>
          <a-form-item
            label="年龄："
            name="age">
            <a-input v-model:value="formData.age" />
          </a-form-item>
          <a-form-item
            label="工作经验："
            name="worktime">
            <a-input v-model:value="formData.worktime" />
          </a-form-item>
          <a-form-item
            label="手机号码："
            name="phone">
            <a-input v-model:value="formData.phone" :maxlength="11" />
          </a-form-item>
          <a-form-item
            label="城市："
            name="city">
            <a-input v-model:value="formData.city" />
          </a-form-item>
          <a-form-item>
            <a-button @click="cancel">取消</a-button>
            <a-button
              type="primary"
              class="ml20"
              @click="save">保存</a-button>
            <a-button
              type="danger"
              class="ml20"
              @click="clear">清空</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
} from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'Add',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const id: string = route.query.id as string;
    const formData = reactive({
      name: '',
      age: '',
      worktime: '',
      phone: '',
      city: '',
    });
    const rules = reactive({
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
      ],
      age: [
        { required: true, message: '请输入年龄', trigger: 'blur' },
      ],
      worktime: [
        { required: true, message: '请输入工作经验', trigger: 'blur' },
      ],
      phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
      ],
      city: [
        { required: true, message: '请输入城市', trigger: 'blur' },
      ],
    });
    const spinning: Ref<boolean> = ref(false);

    onMounted(() => {
      if (id) {
        spinning.value = true;
        axios
          .get(`/api/basic/web/index.php?r=user/view&id=${id}`)
          .then((res) => {
            spinning.value = false;
            if (res.data.code === 200) {
              Object.assign(formData, res.data.data);
            } else {
              message.error('获取数据失败');
            }
          });
      }
    });

    // 表单校验
    const isValidate = (): boolean => {
      if (!formData.name) {
        message.error('请输入姓名');
        return false;
      }
      if (!formData.age) {
        message.error('请输入年龄');
        return false;
      }
      if (!formData.worktime) {
        message.error('请输入工作经验');
        return false;
      }
      if (!formData.phone) {
        message.error('请输入手机号码');
        return false;
      }
      if (!formData.city) {
        message.error('请输入城市');
        return false;
      }
      return true;
    };

    // 公共保存方法
    const saveAction = (url: string, params: FormData) => {
      spinning.value = true;
      axios
        .post(url, params)
        .then((res) => {
          spinning.value = false;
          if (res.data.code === 200) {
            message.success('保存成功');
            router.go(-1);
          } else {
            message.error('保存失败');
          }
        });
    };

    // 保存
    const save = () => {
      if (isValidate()) {
        const params = new FormData();
        params.append('name', formData.name);
        params.append('age', formData.age);
        params.append('worktime', formData.worktime);
        params.append('phone', formData.phone);
        params.append('city', formData.city);
        if (id) { // 编辑
          saveAction(`/api/basic/web/index.php?r=user/update&id=${id}`, params);
        } else { // 新增
          saveAction('/api/basic/web/index.php?r=user/create', params);
        }
      }
    };

    // 取消
    const cancel = () => {
      router.push({
        path: '/user',
      });
    };

    // 清空
    const clear = () => {
      formData.name = '';
      formData.age = '';
      formData.worktime = '';
      formData.phone = '';
      formData.city = '';
    };

    return {
      formData,
      spinning,
      rules,
      save,
      cancel,
      clear,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
