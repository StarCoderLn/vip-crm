import mutations from './mutation';
import getters from './getters';
import actions from './actions';
import state from './store';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
