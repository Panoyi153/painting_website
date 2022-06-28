const { reqPaintDetail } = require("@/api")

const actions = {
    async getPaintDetail({ commit }, artid) {
        let result = await reqPaintDetail(artid)
        if (result.code === 200) {
            commit('GETPAINTDETAIL', result.data)
        } else {
            console.log(result.message);
            return Promise.reject(new Error('error'))
        }
    }
}

const mutations = {
    GETPAINTDETAIL(state, artDetails) {
        state.artDetails = artDetails
    }
}

const state = {
    artDetails: []
}

const getters = {
    artDetail(state) {
        return state.artDetails[0] || {}
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}