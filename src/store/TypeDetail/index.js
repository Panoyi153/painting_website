const { reqTypeDetail } = require("@/api")

const actions = {
    async getTypeDtail({ commit }, typeid) {
        const result = await reqTypeDetail(typeid)
        // console.log('result', result);
        if (result.code === 200) {
            commit('GETTYPEDETAIL', result.data)
        } else {
            console.log(result.message);
            return Promise.reject(new Error('error'))
        }
    }
}

const mutations = {
    GETTYPEDETAIL(state, typeDetail) {
        // console.log(typeDetail);
        state.typeDetail = typeDetail
    }
}
const state = {
    typeDetail: []
}
const getters = {
    typeDetail(state) {
        return state.typeDetail || []
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}