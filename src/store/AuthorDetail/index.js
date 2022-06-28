import { reqAuthorDetail } from "@/api"

const actions = {
    async getAuthorDetail({ commit }, authorid) {
        const result = await reqAuthorDetail(authorid)
        if (result.code === 200) {
            commit('GETAUTHORDETAIL', result.data)
        } else {
            console.log(result.message);
            return Promise.reject(new Error('error'))
        }
    }
}
const mutations = {
    GETAUTHORDETAIL(state, authorDetail) {
        state.authorDetail = authorDetail
    }
}
const state = {
    authorDetail: []
}
const getters = {
    authorDetail(state) {
        return state.authorDetail || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}