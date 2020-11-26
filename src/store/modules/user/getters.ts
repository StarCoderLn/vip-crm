import { userState } from './store';

const moduleGetters = {
  data: (state: userState) => (state),
};

export default moduleGetters;
