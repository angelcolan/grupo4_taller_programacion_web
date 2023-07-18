export default {
    addServiceToCar(state, payload) {
        state.car.push(payload);
        return state;
    },
    clearCar(state, payload) {
        state.car.length = 0;
        return state;
    },

    populateListServices(state, payload) {
        state.services = payload;
        return state;
    },
}
