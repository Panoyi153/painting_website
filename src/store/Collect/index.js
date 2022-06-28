import { reqAddcollect, reqCollectList, reqDelcollect } from "@/api"

const actions = {
    // 加入收藏
    async getAddcollect({ commit }, collectData) {
        let result = await reqAddcollect(collectData)
        if (result.code === 200) {
            commit('GETADDCOLLECT', result.data)
        }
    },
    // 获取收藏表
    async getCollectList({ commit }, token) {
        let result = await reqCollectList(token);
        // console.log(result);
        if (result.code === 200) {
            commit('GETCOLLECTLIST', result.data)
        } else {
            return Promise.reject(new Error('获取收藏表信息失败'))
        }
    },
    // 删除收藏
    async getDelcollect({ commit }, collectData) {
        let result = await reqDelcollect(collectData)
        if (result.data.result) {
            return '删除成功'
        } else {
            return Promise.reject(new Error('删除失败'))
        }
    },
}

const mutations = {
    GETADDCOLLECT(state, data) {
        state.collectResult = data
    },
    GETCOLLECTLIST(state, collectList) {
        state.collectList = collectList
    }
}

const state = {
    collectResult: {},
    collectList: []
}

const getters = {
    collectList(state) {
        return state.collectList || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}