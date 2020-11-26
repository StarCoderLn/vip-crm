import mutations from './mutation';
import moduleGetters from './getters';
import actions from './actions';
import { createState } from './store';

const moduleState = createState();
export default {
  namespaced: true,
  state: moduleState,
  getters: moduleGetters,
  mutations,
  actions,
};
