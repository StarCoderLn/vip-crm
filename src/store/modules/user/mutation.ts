import { UserState } from '@/store//utils';
import { GET_USER_LIST, LOADING } from './constant';

const mutations = {
  [GET_USER_LIST](state: UserState, payload: any) {
    state.tableData = payload.data.list;
    state.total = payload.data.total;
  },
  [LOADING](state: UserState, payload: UserState['loading']) {
    state.loading = payload;
  },
};

export default mutations;
