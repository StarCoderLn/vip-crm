import { ActionContext } from 'vuex';
import axios from 'axios';
import { GET_USER_LIST, LOADING } from './constant';
import { userState } from './store';

axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  [GET_USER_LIST]({ commit }: ActionContext<userState, unknown>) {
    commit(LOADING, true);
    axios
      .get('https://www.easy-mock.com/mock/5fbe61c01bc0682deacc0006/api/getUser?pageSize=98')
      // .get('/index.php?r=user/index')
      .then((res) => {
        commit(GET_USER_LIST, res.data.data.list);
        commit(LOADING, false);
      });
  },
};
