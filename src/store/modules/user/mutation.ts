import { GET_USER_LIST, LOADING } from './constant';
import { userState } from './store';

const mutations = {
  [GET_USER_LIST](state: userState, payload: userState['tableData']) {
    console.log('请求数据：', payload);
    state.tableData = payload;
    // state.loading = false;
  },
  [LOADING](state: userState, payload: userState['loading']) {
    state.loading = payload;
  },
};

export default mutations;
