<template>
  <div class="login">
    <a-spin
      tip="登录中，请稍候..."
      :spinning="spinning">
      <div class="spin-content">
        <div>
        <h1>启明星 CRM 系统</h1>
        <a-form
          :model="formData"
          :rules="rules"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          ref="loginForm">
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
          <a-form-item :wrapper-col="{ offset: 12 }">
            <!-- <a-button>注册</a-button> -->
            <a-button
              type="primary"
              @click="login"
              style="margin-left: 10px;">登录</a-button>
          </a-form-item>
        </a-form>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts">
// import { FormProps } from 'ant-design-vue/lib/form/Form';
import axios from 'axios';
import {
  defineComponent,
  reactive,
  Ref,
  ref,
} from 'vue';
import { message } from 'ant-design-vue';
import router from '../router';

export default defineComponent({
  name: 'Login',
  setup() {
    const formData = reactive({
      username: '',
      password: '',
    });
    const rules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
    });
    const spinning: Ref<boolean> = ref(false);

    // const loginForm: Ref<typeof FormProps> = ref(FormProps);
    // onMounted(() => {
    //   console.log(loginForm.value);
    // });

    // 表单校验
    const isValidate = (): boolean => {
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

    const login = (): void => {
      // loginForm
      //   .validate()
      //   .then(() => {})
      //   .catch(() => {})
      if (isValidate()) {
        spinning.value = true;
        axios
          .post('https://www.easy-mock.com/mock/5fbe61c01bc0682deacc0006/api/login', formData)
          .then((res) => {
            spinning.value = false;
            const isLogin = res.data.data.login;
            localStorage.setItem('login', isLogin);
            if (res.data.code === 200) {
              if (isLogin) {
                message.success('登录成功');
                router.push({
                  path: '/',
                });
              } else {
                message.error('用户名或密码错误');
              }
            } else {
              message.error('登录失败');
            }
          })
          .catch((err) => {
            message.error(err.response.data.error);
          });
      }
    };

    return {
      formData,
      rules,
      // loginForm,
      isValidate,
      login,
      spinning,
    };
  },
});
</script>

<style lang="postcss" scoped>
.login {
  height: var(--size100);
  /* http://pic1.win4000.com/wallpaper/2020-11-11/5fab57a475762.jpg */
  /* https://hbimg.huabanimg.com/0b1c98c60229c746b83de66ff70f095a712e1e4d512ec-bAHsKb_fw658/format/webp */
  /* http://pic1.win4000.com/wallpaper/2020-11-11/5fab57a8e40c1.jpg */
  /* http://pic1.win4000.com/wallpaper/2/53d07b9b9cb86.jpg */
  background: url('http://pic1.win4000.com/wallpaper/2020-11-11/5fab57a8e40c1.jpg') no-repeat;
  background-size: 100% 100%;
}
h1 {
  font-size: var(--fontSize60);
  color: var(--fontWhiteColor);
  text-align: center;
  margin-bottom: var(--mb60);
}
</style>
<style lang="postcss">
.ant-form {
  width: 400px;
}
.ant-form-item-label > label {
  color: var(--fontWhiteColor);
}
.ant-spin-nested-loading, .ant-spin-container, .spin-content {
  width: var(--size100);
  height: var(--size100);
}
.spin-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
