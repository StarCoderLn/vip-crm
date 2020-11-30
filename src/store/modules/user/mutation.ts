import { UserState } from '@/store//utils';
import { GET_USER_LIST, LOADING } from './constant';

const mutations = {
  [GET_USER_LIST](state: UserState, payload: any) {
    state.tableData = payload;
  },
  [LOADING](state: UserState, payload: any) {
    state.loading = payload;
  },
};

export default mutations;
