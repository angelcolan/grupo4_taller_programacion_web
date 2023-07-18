export default {
    addServiceToCar(context, payload) {
        context.commit('addServiceToCar', payload);
    },
    clearCar(context, payload) {
        context.commit('clearCar', payload);
    },

    populateListServices(context, payload) {
        context.commit('populateListServices', payload);
    },
}
