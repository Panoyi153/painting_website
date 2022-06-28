import { reqAddcomment, reqCommentList } from "@/api"

const actions = {
    // 添加评论
    async getAddcomment({ commit }, commentData) {
        let result = await reqAddcomment(commentData)
        if (result.code === 200) {
            commit('GETADDCOMMENT', result.data)
        } else {
            return Promise.reject(new Error('发表评论失败'))
        }
    },
    // 获取评论
    async getCommentList({ commit }, artid) {
        let result = await reqCommentList(artid)
        // console.log(result);
        if (result.code === 200) {
            commit('GETCOMMENTLIST', result.data)
        } else {
            return Promise.reject(new Error('获取评论失败'))
        }
    },
}

const mutations = {
    GETADDCOMMENT(state, commentid_insert) {
        state.commentResult = commentid_insert
    },
    GETCOMMENTLIST(state, commentList) {
        state.commentList = commentList
    }
}

const state = {
    commentResult: {},
    commentList: []
}

const getters = {
    commentList(state) {
        return state.commentList || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}