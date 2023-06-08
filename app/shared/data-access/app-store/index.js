import Store from "../../../pau/state-management/store";
import actions from './actions.js';
import mutations from './mutations.js';
import state from './state';

export default new Store({
    actions,
    mutations,
    state
})
