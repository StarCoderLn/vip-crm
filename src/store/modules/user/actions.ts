import { ActionContext } from 'vuex';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { GET_USER_LIST, LOADING } from './constant';
import { userState } from './store';

axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  [GET_USER_LIST]({ commit }: ActionContext<userState, unknown>) {
    commit(LOADING, true);
    axios
      .get('https://www.easy-mock.com/mock/5fbe61c01bc0682deacc0006/api/getUser?total=98')
      // .get('/index.php?r=user/index')
      .then((res) => {
        if (res.data.code === 200) {
          commit(GET_USER_LIST, res.data.data.list);
        } else {
          message.error('获取数据失败');
        }
        commit(LOADING, false);
      })
      .catch((err) => {
        message.error(err.response.data.error);
        commit(LOADING, false);
      });
  },
};
