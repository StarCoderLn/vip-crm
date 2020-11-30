import { Commit } from 'vuex';
import { UserState, UserProps, asyncAndCommit } from '@/store/utils';
import { GET_USER_LIST } from './constant';

interface ActionProps {
  state: UserState,
  commit: Commit
}

const actions = {
  [GET_USER_LIST]({ state, commit }: ActionProps, params: UserProps) {
    const { name, phone } = params;
    return asyncAndCommit(`/api/basic/web/index.php?r=user/index&name=${name}&phone=${phone}`, 'getUserList', commit);
  },
};

export default actions;
