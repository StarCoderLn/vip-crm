<template>
  <div class="login">
    <a-form
      :model="formData"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      ref="loginForm"
      style="width: 400px;">
      <a-form-item
        label="用户名："
        name="username">
        <a-input v-model:value="formData.username" />
      </a-form-item>
      <a-form-item
        label="密码："
        name="password">
        <a-input v-model:value="formData.password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 10 }">
        <a-button>注册</a-button>
        <a-button
          type="primary"
          @click="login"
          style="margin-left: 10px;">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
// import { FormProps } from 'ant-design-vue/lib/form/Form';
import {
  defineComponent,
  reactive,
} from 'vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  name: 'Login',
  setup() {
    const labelCol = { span: 6 };
    const wrapperCol = { span: 18 };
    const formData = reactive({
      username: '',
      password: '',
    });
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
    };

    // const loginForm: Ref<typeof FormProps> = ref(FormProps);
    // onMounted(() => {
    //   console.log(loginForm.value);
    // });

    const isValidate = () => {
      if (!formData.username) {
        message.error('请输入用户名');
        return false;
      }
      if (!formData.password) {
        message.error('请输入密码');
        return false;
      }
      return true;
    };

    const login = () => {
      // loginForm
      //   .validate()
      //   .then(() => {})
      //   .catch(() => {})
      if (isValidate()) {
        message.success('提交成功');
      }
    };

    return {
      labelCol,
      wrapperCol,
      formData,
      rules,
      // loginForm,
      isValidate,
      login,
    };
  },
});
</script>

<style lang="postcss" scoped>
.login {
  --fontColor: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--fontColor);
  /* background: url('https://hbimg.huabanimg.com/256ab843b7e209fff55576ab92672a5c7a8a8d427a15c-CfaOMB_fw658/format/webp') no-repeat; */
  background-size: 100% 100%;
}
</style>
