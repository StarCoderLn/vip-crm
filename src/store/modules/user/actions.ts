import { Commit } from 'vuex';
import { UserState, asyncAndCommit } from '@/store/utils';
import { GET_USER_LIST } from './constant';

interface ActionProps {
  state: UserState,
  commit: Commit
}

interface paramsProps {
  name: string,
  phone: string,
  pageNumber: number,
  pageSize: number,
}

const actions = {
  [GET_USER_LIST]({ commit }: ActionProps, params: paramsProps) {
    const {
      name,
      phone,
      pageNumber,
      pageSize,
    } = params;
    return asyncAndCommit(`/api/basic/web/index.php?r=user/index&name=${name}&phone=${phone}&pageNumber=${pageNumber}&pageSize=${pageSize}`, 'getUserList', commit);
  },
};

export default actions;
