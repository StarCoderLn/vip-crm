import { createStore } from 'vuex';
import modules from './modules';
import { UserProps } from './utils';

export default createStore<UserProps>({
  modules,
});
