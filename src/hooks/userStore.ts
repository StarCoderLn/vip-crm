import { useStore } from 'vuex';
import { State } from '@/store';
import { Getters, Dispatch } from '@/store/utils';

interface UserStore {
  state: State;
  getters: Getters;
  dispatch: Dispatch;
}

const userStore = (): UserStore => {
  const store = useStore<State>();
  const {
    state,
    getters,
    dispatch,
  }:UserStore = store;
  return {
    state,
    getters,
    dispatch,
  };
};

export default userStore;
